import { ProFormUploadButton, ProFormUploadButtonProps } from '@ant-design/pro-components'
import { Modal } from 'antd'
import React from 'react'
import type { RcFile } from 'antd/es/upload';
import type { UploadFile } from 'antd/es/upload/interface';
import Compressor from 'compressorjs'


const getBase64 = (file: RcFile): Promise<string> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
    });

export function ImageUpload(props: ProFormUploadButtonProps) {
    const [previewOpen, setPreviewOpen] = React.useState(false);
    const [previewImage, setPreviewImage] = React.useState('');
    const [previewTitle, setPreviewTitle] = React.useState('');
    const handleCancel = () => setPreviewOpen(false);

    const handlePreview = async (file: UploadFile) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj as RcFile);
        }

        setPreviewImage(file.url || (file.preview as string));
        setPreviewOpen(true);
        setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1));
    };
    return (
        <>
            <ProFormUploadButton
                fieldProps={{
                    onPreview: handlePreview,
                    beforeUpload(file) {
                        return new Promise((resolve, reject) => {
                            new Compressor(file as Blob, {
                                quality: 0.8,
                                maxHeight: 1000,
                                maxWidth: 1000,
                                success: resolve,
                                error: reject,
                            })
                        });
                    },
                }}

                convertValue={(value: any) => {
                    if (!value) {
                        value = []
                    } else if (!Array.isArray(value)) {
                        value = [value]
                    }
                    return value.map((item: any) => typeof item === 'string' ? ({ url: item }) : item)
                }}
                transform={(value: any, namePath) => {
                    if (!value) {
                        value = []
                    } else if (!Array.isArray(value)) {
                        value = [value]
                    }
                    value = value.map((item: any) => typeof item === 'string' ? item : item.url || item.response?.url)
                    return { [namePath]: props.max === 1 ? value[0] : value }
                }}

                extra="支持扩展名：.jpg .jpeg, .png, .gif"
                listType='picture-card'
                accept='image/*'
                title="上传文件"
                name="image"
                {...props}
            />
            <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
                <img alt="preview" style={{ width: '100%' }} src={previewImage} />
            </Modal>
        </>
    )
}