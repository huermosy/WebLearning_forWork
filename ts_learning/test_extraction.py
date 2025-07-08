#!/usr/bin/env python3
"""
表格字段提取测试脚本
用于验证prompt在不同表格类型上的表现
"""

import json
import os
from pathlib import Path

# 预期结果
EXPECTED_RESULTS = {
    "table_1.html": [
        {"id": "table0_cell1_1", "key": "正常_温差"},
        {"id": "table0_cell1_2", "key": "需注意_温差"},
        {"id": "table0_cell1_3", "key": "异常_温差"},
        {"id": "table0_cell1_4", "key": "备注_温差"}
    ],
    "table_3.html": [
        {"id": "table2_cell1_1", "key": "Point 1_温度测量"},
        {"id": "table2_cell1_2", "key": "Point 2_温度测量"},
        {"id": "table2_cell1_3", "key": "Point 3_温度测量"}
    ],
    "table_5.html": [
        {"id": "table4_cell1_1", "key": "测试仪器"},
        {"id": "table4_cell1_3", "key": "图像编号"},
        {"id": "table4_cell2_1", "key": "天气"},
        {"id": "table4_cell2_3", "key": "环境"},
        {"id": "table4_cell2_5", "key": "湿度"}
    ],
    "table_6.html": [
        {"id": "table5_cell1_1", "key": "Sp1"},
        {"id": "table5_cell2_1", "key": "Bx1"},
        {"id": "table5_cell3_1", "key": "Max"},
        {"id": "table5_cell4_1", "key": "Avg"},
        {"id": "table5_cell5_1", "key": "Min"},
        {"id": "table5_cell6_1", "key": "Dt1(公式)"},
        {"id": "table5_cell7_1", "key": "Bx1.Max-Sp1DeltaValue"}
    ]
}

def load_html_content(file_path):
    """加载HTML文件内容"""
    with open(file_path, 'r', encoding='utf-8') as f:
        return f.read()

def analyze_table_type(html_content):
    """分析表格类型"""
    # 简单的表格类型分析
    if 'data-diagonal-split-type' in html_content:
        return "对角线表头表格"
    elif html_content.count('<tr>') == 1:
        return "单行键值对表格"
    elif 'colspan' in html_content:
        return "多行键值对表格"
    elif html_content.count('<tr>') == 2:
        return "标准网格表格"
    else:
        return "列标题表格"

def main():
    base_dir = Path(__file__).parent
    
    print("=== 表格字段提取测试 ===\n")
    
    # 测试所有表格文件
    for i in range(1, 7):
        file_name = f"table_{i}.html"
        file_path = base_dir / file_name
        
        if file_path.exists():
            print(f"测试 {file_name}:")
            
            # 加载HTML内容
            html_content = load_html_content(file_path)
            
            # 分析表格类型
            table_type = analyze_table_type(html_content)
            print(f"  表格类型: {table_type}")
            
            # 显示预期结果
            if file_name in EXPECTED_RESULTS:
                expected = EXPECTED_RESULTS[file_name]
                print(f"  预期结果: {len(expected)} 个数据单元格")
                for item in expected:
                    print(f"    - {item['id']}: {item['key']}")
            
            print()
    
    print("=== 测试完成 ===")
    print("\n请使用以下prompt测试10B模型:")
    print("1. prompt2.txt (优化版)")
    print("2. prompt3.txt (强化版)")

if __name__ == "__main__":
    main()
