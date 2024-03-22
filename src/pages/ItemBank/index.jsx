import React, { useState, useEffect, useReducer, useContext } from 'react';
import './index.less';
import { AppContext } from '../../App';
import { Select, Table, Input } from 'antd';

import {
    CloseOutlined,
    UnorderedListOutlined,
    SettingOutlined,
    SearchOutlined,
    CaretUpFilled,
    DownOutlined,
    CaretDownFilled,
    CustomerServiceTwoTone,
    ContactsTwoTone,
    DashboardTwoTone,
    ExperimentTwoTone,
} from '@ant-design/icons';
import { debounce, get } from '../../utils';

const { Option } = Select;

function Study() {
    const { appState } = useContext(AppContext);
    const { isMobile, curWidth } = appState;
    const [state, dispatch] = useReducer((state, action) => ({ ...state, ...action }), {
        // 分类列表
        sortList: [
            { title: '全部题目', value: 'all' },
            { title: 'algorithm', value: 'algorithm' },
            { title: 'database', value: 'database' },
            { title: 'shell', value: 'shell' },
            { title: 'javascript', value: 'javascript' },
        ],
        curSort: 'all',
        current_page: 1,
        list_tatal: 250,
        // 状态
        curStatus: '',
        statusList: [
            {
                value: 'unstarted',
                label: '未参与',
            },
            {
                value: 'passed',
                label: '通过',
            },
            {
                value: 'failed',
                label: '失败',
            },
            {
                value: 'repassed',
                label: '二次通过',
            },
        ],
        // 难度
        curDifficulty: '',
        difficultyList: [
            {
                value: 'easy',
                label: '简单',
            },
            {
                value: 'medium',
                label: '中等',
            },
            {
                value: 'hard',
                label: '困难',
            },
        ],
        // 标签
        curLabel: '',
        labelList: [
            {
                value: 'java',
                label: 'Java',
            },
            {
                value: 'python',
                label: 'Python',
            },
            {
                value: 'javascript',
                label: 'JavaScript',
            },
        ],
        // 输入框文字内容
        inputText: '',
        // 排序
        sortBy: {
            status: 'down',
            subject: 'down',
            solved_count: 'down',
            passing_rate: 'down',
            difficulty: 'down',
        },
    });

    const {
        sortList,
        curSort,
        curStatus,
        statusList,
        curDifficulty,
        difficultyList,
        curLabel,
        labelList,
        inputText,
        sortBy,
        current_page,
        list_tatal,
    } = state;

    const handleSortChange = (title, value) => {
        if (curSort === value) {
            dispatch({ curSort: '' });
            return;
        }
        dispatch({ curSort: value });
    };

    const changeStatus = (value) => {
        dispatch({ curStatus: value });
    };

    const changeDifficulty = (value) => {
        dispatch({ curDifficulty: value });
    };

    const changeLabel = (value) => {
        dispatch({ curLabel: value });
    };

    const changText = debounce((value) => {
        dispatch({ inputText: value });
    }, 500);

    useEffect(() => {
        let params = {};
        const { status, subject, solved_count, passing_rate, difficulty } = sortBy;
        params.page = current_page;
        params.kind = curSort;
        params.status = curStatus;
        params.difficulty = curDifficulty;
        params.tags = curLabel;
        params.search = inputText;
        const sort_by = {
            status,
            subject,
            solved_count,
            passing_rate,
            difficulty,
        };
        // 去掉空字符串
        Object.keys(sort_by).forEach((key) => {
            if (sort_by[key] === '') {
                delete sort_by[key];
            }
        });
        params.sort_by = sort_by;
        Object.keys(params).forEach((key) => {
            if (params[key] === '') {
                delete params[key];
            }
        });
        console.log('params', params);
        // get("/v1/study_list", { params })
        //  .then((res) => {
        //     const { data } = res;
        //     console.log("res", res);
        //     // const labelList = data.map(item => ({
        //     //   value: item.name,
        //     //   label: item.name,
        //     // }));
        //     // dispatch({ labelList });
        //   })
        //  .catch((err) => {
        //     console.log(err);
    }, [current_page, sortBy, curSort, curStatus, curDifficulty, curLabel, inputText]);

    const StatusIconMap = {
        unstarted: <CustomerServiceTwoTone />,
        passed: <ContactsTwoTone />,
        failed: <DashboardTwoTone />,
        repassed: <ExperimentTwoTone />,
    };

    const DifficultyTextMap = {
        easy: <div className="easy-text">简单</div>,
        medium: <div className="medium-text">中等</div>,
        hard: <div className="hard-text">困难</div>,
    };

    const columns = [
        {
            title: '状态',
            width: 60,
            dataIndex: 'status',
            key: 'status',
            render: (text) => <div>{StatusIconMap[text]}</div>,
        },
        {
            title: (
                <div className="sort-item-title">
                    <div>题目</div>
                    <div className="sort-item-icon">
                        <CaretUpFilled
                            onClick={() => {
                                dispatch({ sortBy: { ...sortBy, subject: 'up' } });
                            }}
                            style={{
                                fontSize: 12,
                                color: sortBy.subject === 'up' ? '#1890ff' : '#ccc',
                            }}
                        />
                        <CaretDownFilled
                            onClick={() => {
                                dispatch({ sortBy: { ...sortBy, subject: 'down' } });
                            }}
                            style={{
                                fontSize: 12,
                                color: sortBy.subject === 'down' ? '#1890ff' : '#ccc',
                            }}
                        />
                    </div>
                </div>
            ),
            width: 150,
            dataIndex: 'subject',
            key: 'subject',
        },
        {
            title: (
                <div className="sort-item-title">
                    <div>题解</div>
                    <div className="sort-item-icon">
                        <CaretUpFilled
                            onClick={() => {
                                dispatch({ sortBy: { ...sortBy, solved_count: 'up' } });
                            }}
                            style={{
                                fontSize: 12,
                                color: sortBy.solved_count === 'up' ? '#1890ff' : '#ccc',
                            }}
                        />
                        <CaretDownFilled
                            onClick={() => {
                                dispatch({ sortBy: { ...sortBy, solved_count: 'down' } });
                            }}
                            style={{
                                fontSize: 12,
                                color: sortBy.solved_count === 'down' ? '#1890ff' : '#ccc',
                            }}
                        />
                    </div>
                </div>
            ),
            dataIndex: 'solved_count',
            key: '1',
            width: 80,
        },
        {
            title: (
                <div className="sort-item-title">
                    <div>通过率</div>
                    <div className="sort-item-icon">
                        <CaretUpFilled
                            onClick={() => {
                                dispatch({ sortBy: { ...sortBy, passing_rate: 'up' } });
                            }}
                            style={{
                                fontSize: 12,
                                color: sortBy.passing_rate === 'up' ? '#1890ff' : '#ccc',
                            }}
                        />
                        <CaretDownFilled
                            onClick={() => {
                                dispatch({ sortBy: { ...sortBy, passing_rate: 'down' } });
                            }}
                            style={{
                                fontSize: 12,
                                color: sortBy.passing_rate === 'down' ? '#1890ff' : '#ccc',
                            }}
                        />
                    </div>
                </div>
            ),
            dataIndex: 'passing_rate',
            key: '2',
            width: 100,
        },
        {
            title: (
                <div className="sort-item-title">
                    <div>难度</div>
                    <div className="sort-item-icon">
                        <CaretUpFilled
                            onClick={() => {
                                dispatch({ sortBy: { ...sortBy, difficulty: 'up' } });
                            }}
                            style={{
                                fontSize: 12,
                                color: sortBy.difficulty === 'up' ? '#1890ff' : '#ccc',
                            }}
                        />
                        <CaretDownFilled
                            onClick={() => {
                                dispatch({ sortBy: { ...sortBy, difficulty: 'down' } });
                            }}
                            style={{
                                fontSize: 12,
                                color: sortBy.difficulty === 'down' ? '#1890ff' : '#ccc',
                            }}
                        />
                    </div>
                </div>
            ),
            dataIndex: 'difficulty',
            key: '3',
            width: 80,
            render: (text) => DifficultyTextMap[text],
        },
    ];
    const data = [];
    for (let i = 0; i < 100; i++) {
        data.push({
            key: i,
            subject: `题目 ${i}`,
            solved_count: i * 10,
            passing_rate: i * 0.1,
            difficulty: i % 3 === 0 ? 'easy' : i % 3 === 1 ? 'medium' : 'hard',
            status:
                i % 4 === 0
                    ? 'unstarted'
                    : i % 3 === 1
                    ? 'passed'
                    : i % 3 === 2
                    ? 'failed'
                    : 'repassed',
        });
    }

    useEffect(() => {
        getTags();
    }, []);

    // 获取标签
    const getTags = () => {
        get('/v1/all_tags')
            .then((res) => {
                const { data } = res;
                console.log('res', res);
                // const labelList = data.map(item => ({
                //   value: item.name,
                //   label: item.name,
                // }));
                // dispatch({ labelList });
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <div className="item-bank-container">
            <div className="item-bank-left">
                <div className="item-bank-title">推荐</div>
                <div className="recommend-container">
                    <div className="recommend-wrapper">
                        <div className="recommend-item">推荐一</div>
                        <div className="recommend-item">推荐二</div>
                        <div className="recommend-item">推荐三</div>
                    </div>
                </div>
                <div className="item-bank-sort-list-container">
                    <div className="item-bank-sort-list">
                        {sortList.map(({ title, value }, index) => {
                            return (
                                <div
                                    key={`title-${index}`}
                                    className={`sort-item ${curSort === value ? 'active' : ''} `}
                                    onClick={() => {
                                        handleSortChange(title, value);
                                    }}
                                >
                                    <SettingOutlined />
                                    {title}
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div className="item-bank-select-list-container">
                    <div className="item-bank-select-list">
                        <Select
                            style={{
                                width: 150,
                            }}
                            allowClear
                            placeholder="状态"
                            options={statusList}
                            onSelect={(value) => changeStatus(value)}
                            onClear={() => dispatch({ curStatus: '' })}
                        />
                        <Select
                            style={{
                                width: 150,
                            }}
                            placeholder="难度"
                            allowClear
                            options={difficultyList}
                            onSelect={(value) => changeDifficulty(value)}
                            onClear={() => dispatch({ curDifficulty: '' })}
                        />
                        <Select
                            style={{
                                width: 150,
                            }}
                            allowClear
                            placeholder="标签"
                            options={labelList}
                            onSelect={(value) => changeLabel(value)}
                            onClear={() => dispatch({ curLabel: '' })}
                        />
                        <Input
                            placeholder="搜索题目、编号或内容"
                            style={{
                                width: 220,
                            }}
                            prefix={<SearchOutlined />}
                            onChange={(e) => changText(e.target.value)}
                            allowClear
                        />
                    </div>
                </div>
                <Table
                    columns={columns}
                    dataSource={data}
                    scroll={{
                        x: 300,
                        y: 600,
                    }}
                    // antd site header height
                    sticky={{
                        offsetHeader: 64,
                    }}
                    pagination={{
                        defaultPageSize: 50,
                        onChange: (page, pageSize) => {
                            dispatch({ current_page: page });
                        },
                        showSizeChanger: false,
                        total: list_tatal,
                    }}
                    rowClassName={(record, index) => {
                        if (index % 2 === 1) {
                            return 'gray-row'; // 如果是偶数行则返回'gray-row'
                        }
                        return '';
                    }}
                />
            </div>
            <div className="item-bank-right" style={{ display: isMobile ? 'none' : 'block' }}></div>
        </div>
    );
}

export default Study;
