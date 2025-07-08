# 基于矩阵建模的表格提取技术应用于小模型场景

## 针对10B小模型的特殊优化

基于之前的矩阵建模分析，我们需要考虑如何将这种方法应用于资源受限的小模型场景。10B小模型相比大模型有计算能力和上下文理解能力的限制，因此需要更加精确和高效的特征表示。

### 1. 轻量级特征表示

对于10B小模型，我们需要简化特征向量，仅保留最具区分性的特征：

```python
LightweightCellFeature(i,j) = [
    # 核心结构特征 - 仅保留最重要的维度
    position_encoding,      # 行列位置的编码
    colspan,                # 跨列数
    rowspan,                # 跨行数
    
    # 简化的内容特征
    is_empty,               # 是否为空
    text_category,          # 文本类别(数字/文本/混合)
    
    # 简化的上下文特征
    rel_position_to_header, # 相对于最近标题的位置
    rel_position_to_corner  # 相对于表格角落的位置
]
```

### 2. 确定性算法替代相关性计算

由于小模型难以处理复杂的相关性计算，我们可以使用更确定性的规则：

```python
def determine_cell_type(cell, table_matrix):
    """确定单元格类型的确定性算法"""
    # 使用决策树替代复杂的相关性计算
    if cell.colspan > 1 or cell.rowspan > 1:
        return "header"
    elif cell.row == 0 or cell.col == 0:
        return "header"
    elif is_empty(cell) and has_neighbor_header(cell, table_matrix):
        return "data"
    elif contains_number_or_unit(cell):
        return "data"
    else:
        # 更多确定性规则
        return classify_by_position(cell, table_matrix)
```

### 3. 预计算的模式识别

对于小模型，可以预先定义常见的表格模式，避免复杂计算：

```python
TABLE_PATTERNS = {
    "diagonal_header": {
        "features": {"has_diagonal_split": True},
        "data_cell_rule": "r > diagonal_r and c > diagonal_c",
        "key_template": "{col_header}_{row_header}"
    },
    "key_value_single_row": {
        "features": {"row_count": 1, "cell_count_even": True},
        "data_cell_rule": "column % 2 == 1",
        "key_template": "{prev_cell}"
    },
    "key_value_multi_row": {
        "features": {"has_colspan": True, "post_title_cols": 2},
        "data_cell_rule": "col == 1 and not is_title_row",
        "key_template": "{row_first_cell}"
    },
    "standard_grid": {
        "features": {"first_row_headers": True, "first_col_headers": True},
        "data_cell_rule": "r > 0 and c > 0",
        "key_template": "{col_header}_{row_header}"
    },
    "column_header": {
        "features": {"first_col_headers": True, "first_row_not_header": True},
        "data_cell_rule": "c > 0",
        "key_template": "{row_first_cell}"
    }
}
```

## 特征编码与简化

### 1. 二值特征编码

为了让小模型能更容易处理特征，使用二值化的特征表示：

```python
def binarize_features(cell, table):
    """将单元格特征二值化"""
    binary_features = {
        # 位置特征
        "is_first_row": int(cell.row == 0),
        "is_first_col": int(cell.col == 0),
        "is_last_row": int(cell.row == table.rows - 1),
        "is_last_col": int(cell.col == table.cols - 1),
        
        # 属性特征
        "has_colspan": int(cell.colspan > 1),
        "has_rowspan": int(cell.rowspan > 1),
        "has_diagonal": int(has_attribute(cell, "data-diagonal-split-type")),
        "is_empty": int(len(cell.text.strip()) == 0),
        
        # 内容特征
        "has_number": int(contains_number(cell.text)),
        "has_unit": int(contains_unit(cell.text)),
    }
    return binary_features
```

### 2. 表格类型快速检测

为小模型设计快速检测表格类型的决策树：

```
def detect_table_type(table):
    # 严格顺序检测
    if has_diagonal_split_cell(table):
        return "diagonal_header"
    elif table.rows == 1 and is_even(table.cells_count):
        return "key_value_single_row"
    elif has_colspan_rows(table) and count_columns_after_titles(table) == 2:
        return "key_value_multi_row"
    elif all_cells_have_headers(table.rows[0]) and all_cells_have_headers([row[0] for row in table.rows]):
        return "standard_grid"
    elif all_cells_have_headers([row[0] for row in table.rows]) and not all_cells_have_headers(table.rows[0]):
        return "column_header"
    else:
        return "special_form"
```

## 小模型优化的提取流程

### 1. 预处理和特征提取

```python
def preprocess_html_table(html_table):
    """预处理HTML表格为小模型友好的表示"""
    # 解析HTML
    dom = parse_html(html_table)
    
    # 提取所有单元格
    cells = []
    for i, row in enumerate(dom.find_all("tr")):
        for j, cell in enumerate(row.find_all("td")):
            cell_data = {
                "id": cell.get("data-cell-id", f"cell_{i}_{j}"),
                "row": i,
                "col": j,
                "colspan": int(cell.get("colspan", 1)),
                "rowspan": int(cell.get("rowspan", 1)),
                "diagonal": cell.has_attr("data-diagonal-split-type"),
                "text": cell.text.strip(),
                "is_empty": len(cell.text.strip()) == 0,
            }
            cells.append(cell_data)
    
    # 构建矩阵表示
    matrix = build_matrix(cells)
    
    # 提取二值特征
    for cell in cells:
        cell["features"] = binarize_features(cell, matrix)
    
    return {"cells": cells, "matrix": matrix}
```

### 2. 表格类型识别与数据单元格提取

```python
def extract_data_cells(preprocessed_table):
    """提取表格中的数据单元格"""
    table_type = detect_table_type(preprocessed_table["matrix"])
    pattern = TABLE_PATTERNS[table_type]
    
    data_cells = []
    for cell in preprocessed_table["cells"]:
        # 使用对应表格类型的规则判断是否是数据单元格
        if eval(pattern["data_cell_rule"], {"cell": cell, **globals()}):
            data_cells.append(cell)
    
    return data_cells, table_type
```

### 3. Key生成优化

```python
def generate_keys(data_cells, preprocessed_table, table_type):
    """为数据单元格生成keys"""
    pattern = TABLE_PATTERNS[table_type]
    result = []
    
    for cell in data_cells:
        # 获取key模板中需要的值
        template_vars = {}
        
        if "{col_header}" in pattern["key_template"]:
            template_vars["col_header"] = get_column_header(cell, preprocessed_table)
        
        if "{row_header}" in pattern["key_template"]:
            template_vars["row_header"] = get_row_header(cell, preprocessed_table)
        
        if "{prev_cell}" in pattern["key_template"]:
            template_vars["prev_cell"] = get_previous_cell_text(cell, preprocessed_table)
        
        if "{row_first_cell}" in pattern["key_template"]:
            template_vars["row_first_cell"] = get_first_cell_in_row(cell, preprocessed_table)
        
        # 使用模板生成key
        key = pattern["key_template"].format(**template_vars)
        
        result.append({
            "id": cell["id"],
            "key": key
        })
    
    return result
```

### 4. 结果验证与修正

```python
def validate_and_fix_results(results, preprocessed_table):
    """验证结果并修正常见错误"""
    validated_results = []
    
    for result in results:
        # 检查key是否符合规则
        if is_valid_key(result["key"]):
            validated_results.append(result)
        else:
            # 尝试修复
            fixed_key = fix_key(result["key"], result["id"], preprocessed_table)
            validated_results.append({
                "id": result["id"],
                "key": fixed_key
            })
    
    return validated_results
```

## 小模型适配的表格提取流程

完整的流程如下：

```python
def extract_table_fields_for_small_model(html_table):
    """适合小模型的表格字段提取流程"""
    try:
        # 1. 预处理和特征提取
        preprocessed_table = preprocess_html_table(html_table)
        
        # 2. 表格类型识别与数据单元格提取
        data_cells, table_type = extract_data_cells(preprocessed_table)
        
        # 3. Key生成
        results = generate_keys(data_cells, preprocessed_table, table_type)
        
        # 4. 结果验证与修正
        validated_results = validate_and_fix_results(results, preprocessed_table)
        
        return validated_results
    
    except Exception as e:
        # 降级处理 - 使用简单的规则进行提取
        return fallback_extraction(html_table)
```

## 与基于规则的方法对比

与基于规则的方法相比，矩阵建模方法在小模型场景下有以下优势：

1. **规则更加明确**：转换为二值特征和明确的判断模式，便于小模型理解
2. **减少了复杂逻辑**：避免嵌套条件和长文本描述，降低小模型的推理负担
3. **提高了一致性**：通过固定流程和预定义模式，减少小模型的不确定性

## 结论与实施路径

针对10B小模型的表格提取任务，建议采用以下实施路径：

1. **初步实现**：基于上述矩阵建模方法，构建表格特征提取和分类流程
2. **迭代优化**：通过实际测试，优化特征选择和判断规则
3. **混合方法**：保留规则方法的确定性，结合矩阵建模的系统性
4. **模型微调**：考虑对小模型进行专项微调，提高其对表格结构的理解能力

最终，我们可以构建一个既保持确定性又具有足够灵活性的表格提取系统，充分发挥10B小模型的能力，同时避免其局限性。
