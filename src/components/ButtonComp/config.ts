import {PROP_TYPES} from "../Config";

export default {
    "basic": {
        "text": {
            "name": "文本", // 属性名称
            "required": false, // 非必须
            "editType": "TEXT", // 属性的编辑类型是“TEXT"，即”文本“类型，所以在设计器中用”文本输入框“来设置这个属性的值
            "defaultValue": "默认文本" // 默认值
        },
        "type": {
            "required": false,
            "name": "类型",
            "values": [
                "default", "primary", "dashed", "danger", "link"
            ],
            "defaultValue": "default"
        },
        "size": {
            "required": false,
            "name": "尺寸",
            "values": [
                "default", "small", "large"
            ],
            "defaultValue": "default"
        },
        "ghost": {
            "required": false,
            "name": "背景透明",
            "values": [
                true, false
            ],
            "defaultValue": false
        },
    }
}