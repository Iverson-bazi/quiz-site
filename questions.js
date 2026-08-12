// 题目数据文件
// 每道题的结构：
// {
//   number: 题目原始编号,
//   type: 'single' | 'multi' | 'judge',  // single=单选题, multi=不定项选择题, judge=判断题
//   question: '题目内容',
//   options: ['选项A', '选项B', ...],  // 判断题可省略或使用 ['正确', '错误']
//   answer: 0 或 [0, 1],  // 单选题/判断题：正确答案索引；多选题：正确答案索引数组
//   explanation: '答案解析（可选）'
// }

const questions = [
    {
        number: 1,
        type: 'multi',
        question: "IPD 硬件产品开发流程有几个阶段",
        options: [
            "3 个",
            "4 个",
            "5 个",
            "6 个"
        ],
        answer: [3]
    },
    {
        number: 2,
        type: 'multi',
        question: "IPD 产品开发流程团队中，谁是项目的总负责人？",
        options: [
            "项目经理",
            "产品经理",
            "产品工程师",
            "市场经理"
        ],
        answer: [0]
    },
    {
        number: 3,
        type: 'multi',
        question: "IPD 产品开发流程中，产品认证需求是在哪个阶段导入？",
        options: [
            "概念阶段",
            "计划阶段",
            "开发阶段",
            "验证阶段"
        ],
        answer: [0]
    },
    {
        number: 4,
        type: 'multi',
        question: "不属于产品需求清单来源的是（）",
        options: [
            "竞品分析",
            "项目任务书",
            "上一代产品问题",
            "开发工程师"
        ],
        answer: [3]
    },
    {
        number: 5,
        type: 'multi',
        question: "ITR 系统，问题录入时，哪些信息是必须的？",
        options: [
            "问题描述",
            "问题等级",
            "处理人",
            "附件佐证"
        ],
        answer: [0, 1]
    },
    {
        number: 6,
        type: 'multi',
        question: "ITR 系统，问题都有哪些（）",
        options: [
            "产品类问题",
            "交付类问题",
            "供应链类问题",
            "研发问题"
        ],
        answer: [0, 1, 2, 3]
    },
    {
        number: 7,
        type: 'multi',
        question: "测试的准入标准是什么（）",
        options: [
            "研发修改影响域分析表准备到位",
            "正常类测试用例自测全部执行完毕，或输出自测报告",
            "上版本 BUG 修改率大于等于 90% 或剩余小于等于 3 个",
            "研发已提交产品测试申请流程",
            "测试方案或用例编写完毕并通过评审",
            "测试设备及测试环境准备到位，冒烟测试已通过"
        ],
        answer: [0, 1, 2, 3, 4, 5]
    },
    {
        number: 8,
        type: 'multi',
        question: "产品测试通过标准是什么（）",
        options: [
            "大型项目 DI 值小于 10",
            "中型项目 DI 值小于 5",
            "小微型项目 DI 值小于 3",
            "以上都不对"
        ],
        answer: [0, 1, 2]
    },
    {
        number: 9,
        type: 'multi',
        question: "下面选项对测试的理解正确的是（）",
        options: [
            "测试是为了发现错误而执行的一种程序过程",
            "测试是为了执行产品开发",
            "测试是一种工种，完成一项工作",
            "测试就是检查错误",
            "解决方案"
        ],
        answer: [0]
    },
    {
        number: 10,
        type: 'multi',
        question: "好需求都有哪些特性（）",
        options: [
            "完整性",
            "正确性",
            "可行性",
            "无二义性"
        ],
        answer: [0, 1, 2, 3]
    },
    {
        number: 11,
        type: 'multi',
        question: "需求收集人都有哪些（）",
        options: [
            "销售人员",
            "市场人员",
            "产品经理",
            "公司人员"
        ],
        answer: [0, 1, 2]
    },
    {
        number: 12,
        type: 'multi',
        question: "谁必须参与需求分析和评审工作",
        options: [
            "产品总监",
            "产品经理",
            "PMT 市场代表为核心团队",
            "软件开发人员"
        ],
        answer: [1, 2, 3]
    },
    {
        number: 13,
        type: 'multi',
        question: "产品测试管理过程，缺陷关闭由谁负责（）",
        options: [
            "原则上谁提报谁关闭",
            "产品经理",
            "项目经理",
            "开发工程师"
        ],
        answer: [0]
    },
    {
        number: 14,
        type: 'multi',
        question: "RDM 缺陷管理提报缺陷，缺陷等级都有哪些（）",
        options: [
            "致命问题",
            "严重问题",
            "一般问题",
            "建议类问题",
            "提示问题"
        ],
        answer: [0, 1, 2, 3]
    },
    {
        number: 15,
        type: 'multi',
        question: "RDM 缺陷管理，对存在争议类问题无法达成一致的，如何处理？",
        options: [
            "产品经理决策",
            "产品总工决定",
            "项目经理决策",
            "组织 CCB 团队决策"
        ],
        answer: [3]
    },
    {
        number: 16,
        type: 'multi',
        question: "公司的产品线都有哪些？",
        options: [
            "一体化农机、RTK、全站仪、激光、监测",
            "安防、无人船、测深、ADCP",
            "智能机械",
            "无人机"
        ],
        answer: [0, 1, 2, 3]
    },
    {
        number: 17,
        type: 'multi',
        question: "属于激光 RTK 产品功能的是（）",
        options: [
            "静态采集",
            "RTK 数据采集",
            "倾斜测量",
            "激光测量"
        ],
        answer: [0, 1, 2, 3]
    },
    {
        number: 18,
        type: 'multi',
        question: "农机产品主要的核心指标是什么（）",
        options: [
            "作业在线精度",
            "收星数量",
            "安装便携",
            "快速获得 RTK 固定解"
        ],
        answer: [0, 1, 3]
    },
    {
        number: 19,
        type: 'multi',
        question: "属于全站仪产品的核心指标是什么（）",
        options: [
            "测角精度",
            "测距精度",
            "快速照准棱镜",
            "快速对中整平"
        ],
        answer: [0, 1]
    },
    {
        number: 20,
        type: 'multi',
        question: "属于 SLAM 产品合格点云范畴的是（）",
        options: [
            "点云精度",
            "点云完整性",
            "点云噪点及伪影",
            "点云赋色效果"
        ],
        answer: [0, 1, 2, 3]
    },
    {
        number: 21,
        type: 'multi',
        question: "安防和监测产品核心指标是什么（）",
        options: [
            "数据长时间通信稳定性及完整性",
            "数据的实时性",
            "长续航",
            "快充"
        ],
        answer: [0, 1, 2]
    },
    {
        number: 23,
        type: 'multi',
        question: "属于测深产品的核心指标是什么（）",
        options: [
            "深度测得准",
            "回波数据完整",
            "重量轻便",
            "安装便携"
        ],
        answer: [0, 1]
    },
    {
        number: 24,
        type: 'multi',
        question: "属于智能机械产品的核心指标是什么（）",
        options: [
            "智能控制精度准确",
            "智能控制响应及时",
            "续航长",
            "易充电"
        ],
        answer: [0, 1]
    },
    {
        number: 25,
        type: 'multi',
        question: "一般产品可靠性试验验证有哪几个阶段（）",
        options: [
            "研发初样",
            "研发阶段",
            "工程试制阶段",
            "量产阶段"
        ],
        answer: [1, 2, 3]
    },
    {
        number: 26,
        type: 'multi',
        question: "新产品试制的目的（）",
        options: [
            "交付需求",
            "质量特性符合设计和开发的要求",
            "制定工装夹具准备及系统建立",
            "验证预测批量生产过程中可变因素而进行必要校正改善和提前控制"
        ],
        answer: [1]
    },
    {
        number: 27,
        type: 'multi',
        question: "测绘行业客户场景包含哪些维度（）",
        options: [
            "作业环境：山林遮挡、隧道弱信号、工地电磁干扰、水下测量",
            "使用人群：新手测量员、专业勘察院工程师、村镇确权办事人员",
            "使用强度：24 小时连续道路监测、间断地籍测绘、长期矿山变形观测",
            "配套搭配：全站仪 + 棱镜、RTK + 手簿、三维扫描仪配套建模软件"
        ],
        answer: [0, 1, 2, 3]
    },
    {
        number: 28,
        type: 'multi',
        question: "下列行为属于缺乏客户导向测绘质量意识的是（）",
        options: [
            "研发测绘仪器前调研路桥、国土、矿山客户作业工况",
            "地籍测绘成果出错引发业主纠纷后，优化外业核查流程",
            "外业只按规范测点，不考虑施工单位放线、确权登记实际使用需求",
            "针对客户高频出现的坐标偏移问题增加专项检核"
        ],
        answer: [2]
    },
    {
        number: 29,
        type: 'multi',
        question: "测绘行业 “下一道工序即是客户”，对应含义是（）",
        options: [
            "只需对接外部国土、施工甲方客户",
            "外业观测、内业成图、质检、归档每一步成果，都要满足下游使用场景",
            "外部甲方客户优先级高于内部工序",
            "所有成果质量问题全部由最终质检人员负责"
        ],
        answer: [1]
    },
    {
        number: 30,
        type: 'multi',
        question: "测绘行业树立全员质量意识的核心目标是（）",
        options: [
            "减少内业返工改图工作量",
            "避免测绘成果、测绘设备流入客户现场产生数据错误、工程事故",
            "应付测绘资质年审检查",
            "缩短外业测绘工期"
        ],
        answer: [1]
    }
];
