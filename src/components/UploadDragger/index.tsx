import React, { Component } from 'react';
import { Upload, Icon, message } from 'antd';
import {isFunction} from 'lodash-es';
import { getGID } from 'beast-utils';
interface IUploadDragger {
    isPreviewMode?:boolean,
    changeUploadCb?:any,
    onBeforeUploadCb(thumbUrl:string,originFileObj:any):any,
    closePreviewCb?:any
    previewFile?:any
}
const Dragger:any = Upload.Dragger;

export default class UploadDragger extends Component<IUploadDragger,any> {
    static defaultProps = {
        isPreviewMode: false,    //是否为预览模式
        previewFile: undefined,//预览文件的相关信息
        previewFileThumb: '',//预览文件的缩略图
        previewPath: '',    //预览路径
        previewFileType: '', //预览的文件类型.jpg\.png\.doc\....
        onBeforeUploadCb: null, // 图片上传之前的回调，当用户选择本地文件之后，会回调此方法；
                                // @param file Object 选择的本地文件对象，包含两个字段：{thumbUrl:"String 图片的 base64 数据，只有图片类型有这个字段", originFileObj:'File 本地文件资源'}
                                // (file) => {}
        changeUploadCb: 'undefined', //上传文件回传
        listType: 'false', //上传列表的内建样式，支持三种基本样式 text, picture 和 picture-card
        actionUrl: './',
    };
    constructor(props:IUploadDragger) {
        super(props);
        this.state = {
            isShowUpload: true,
            isPreviewMode: this.props.isPreviewMode,
        };
    }

    onChangeUpload = (info:any) => {
        console.log('info', info);
        const status = info.file.status, { changeUploadCb } = this.props;
        if (status !== 'uploading') {
            // this.setState({
            //   isShowUpload: false,
            // });
        }
        if (status === 'done') {
            // this.setState({
            //   isShowUpload: false,
            // });
            //message.success(`${info.file.name} 文件上传成功.`);
            if (isFunction(changeUploadCb)) {
                changeUploadCb(info);
            }
        } else if (status === 'error') {
            // this.setState({
            //   isShowUpload: true,
            // });
            message.error(`${info.file.name} 文件上传失败.`);
        }

    };

    //关闭预览效果,显示上传操作
    onClosePreview = () => {
        const { closePreviewCb } = this.props;
        this.setState({ isPreviewMode: !this.state.isPreviewMode });
        isFunction(closePreviewCb)
        && closePreviewCb();
    };

    onBeforeUpload = (file:any) => {
        // console.log(file);
        const { onBeforeUploadCb } = this.props;
        const fileObj:any = {
            uid: getGID(),
            originFileObj: file,
        };

        if (-1 !== file.type.search(/image/i)) {
            let reader = new FileReader();

            reader.onload = () => {
                // console.log('reader.result', reader.result);
                fileObj.thumbUrl = reader.result;

                if (isFunction(onBeforeUploadCb)) {
                    onBeforeUploadCb(fileObj);
                }
            };

            reader.readAsDataURL(file);
        } else {
            if (isFunction(onBeforeUploadCb)) {
                onBeforeUploadCb(fileObj);
            }
        }

        return false;
    };

    render() {
        const { previewFile } = this.props, { isPreviewMode } = this.state,
            uploadProps = {
                name: 'file',
                multiple: true,
                listType: 'picture',
                showUploadList: true,
                isVisible: true,
                beforeUpload: this.onBeforeUpload,
                // action:'./',
                // onChange: this.onChangeUpload.bind(this),
            };
        return (
            <>
                {/*// isPreviewMode && previewFile && previewFile.thumbUrl ?*/}
                {/*//   <div className={styles.uploadPreviewDrag}>*/}
                {/*//     <div className={styles.previewImg}>*/}
                {/*//       <img src={previewFile.thumbUrl}*/}
                {/*//            alt={previewFile.name}/>*/}
                {/*//     </div>*/}
                {/*//     <div className={styles.previewClose}>*/}
                {/*//       <Icon type="close" onClick={this.onClosePreview.bind(this)}/>*/}
                {/*//     </div>*/}
                {/*//   </div> :*/}
                <Dragger {...uploadProps}>
                    <p className="ant-upload-drag-icon">
                        <Icon type="cloud-upload"/>
                    </p>
                    <p className="ant-upload-text">请将上传文件拖入此区域完成上传</p>
                    <p className="ant-upload-hint">支持单个或批量上传</p>
                </Dragger>
            </>
        );
    }
}

/*UploadDragger.defaultProps = {
    isPreviewMode: false,    //是否为预览模式
    previewFile: undefined,//预览文件的相关信息
    previewFileThumb: '',//预览文件的缩略图
    previewPath: '',    //预览路径
    previewFileType: '', //预览的文件类型.jpg\.png\.doc\....
    onBeforeUploadCb: null, // 图片上传之前的回调，当用户选择本地文件之后，会回调此方法；
                            // @param file Object 选择的本地文件对象，包含两个字段：{thumbUrl:"String 图片的 base64 数据，只有图片类型有这个字段", originFileObj:'File 本地文件资源'}
                            // (file) => {}
    changeUploadCb: 'undefined', //上传文件回传
    listType: 'false', //上传列表的内建样式，支持三种基本样式 text, picture 和 picture-card
    actionUrl: './',
};*/
