

// export default FileItem
import { VscFilePdf, VscFileZip, VscFile } from 'react-icons/vsc'
import classNames from '../utils/classNames'
import type { CommonProps } from '../@types/common'

const BYTE = 1000
const getKB = (bytes: number) => Math.round(bytes / BYTE)

const FileIcon = ({ children }: CommonProps) => {
    return <span className="text-3xl heading-text">{children}</span>
}

export interface FileItemProps extends CommonProps {
    file: File | string // Accept both File and URL
    usedFor?: 'group-media' | ''
    dateTime?: string
    inputFileName?: string
}

const FileItem = (props: FileItemProps) => {
    const {
        file,
        children,
        className,
        usedFor = '',
        dateTime = '',
        inputFileName,
    } = props

    // Determine if file is a File object or a URL
    const isFileObject = file instanceof File
    const fileName = isFileObject
        ? file.name
        : file.split('/').pop() || 'Unknown File'
    const fileSize = isFileObject ? `${getKB(file.size)} kb` : ''
    const fileType = isFileObject
        ? file.type
        : fileName.includes('.')
            ? fileName.split('.').pop()?.toLowerCase()
            : ''

    const renderThumbnail = () => {
        const isImage = isFileObject
            ? file.type.startsWith('image/')
            : fileType &&
            ['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(fileType)

        if (isImage) {
            return (
                <img
                    // className="upload-file-image "
                    className={
                        usedFor == 'group-media'
                            ? 'w-[100px] h-[60px] overflow-hidden rounded-lg'
                            : 'upload-file-image'
                    }
                    src={isFileObject ? URL.createObjectURL(file) : file}
                    alt={`file preview ${fileName}`}
                />
            )
        }

        if (fileType === 'zip' || fileType === 'application/zip') {
            return (
                <FileIcon>
                    <VscFileZip />
                </FileIcon>
            )
        }

        if (fileType === 'pdf' || fileType === 'application/pdf') {
            return (
                <FileIcon>
                    <VscFilePdf />
                </FileIcon>
            )
        }

        return (
            <FileIcon>
                <VscFile />
            </FileIcon>
        )
    }

    return (
        <div className={classNames('upload-file', className)}>
            {usedFor == 'group-media' ? (
                <>
                    <div className="flex items-center w-full ">
                        {/* flex-col md:flex-row */}
                        <div
                            className={`${usedFor == 'group-media' ? 'upload-file-thumbnail' : ''} !w-[80px] !h-[60px] overflow-hidden`}
                        >
                            {renderThumbnail()}
                        </div>
                        <div className="upload-file-info !truncate pr-4 lg:w-60">
                            <h6 className="upload-file-name text-sm font-bold overflow-hidden text-ellipsis">
                                {(inputFileName || fileName).length > 10
                                    ? (inputFileName || fileName).slice(0, 10) + '...'
                                    : (inputFileName || fileName)}
                            </h6>
                            {fileSize ? (
                                <span className="upload-file-size text-xs">
                                    {fileSize}{' '}
                                </span>
                            ) : (
                                <>
                                    {dateTime && (
                                        <span className="text-xs">
                                            <span className="hidden md:inline">
                                                {/* Uploaded on: */}
                                            </span>{' '}
                                            {dateTime}
                                        </span>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                </>
            ) : (
                <div className="flex items-center !min-w-60">
                    <div className="upload-file-thumbnail ">
                        {renderThumbnail()}
                    </div>
                    <div className="upload-file-info !truncate pr-4">
                        <h6 className="upload-file-name text-sm font-bold overflow-hidden text-ellipsis">
                            {fileName}
                        </h6>
                        <span className="upload-file-size">{fileSize}</span>
                    </div>
                </div>
            )}

            {children}
        </div>
    )
}

FileItem.displayName = 'UploadFileItem'

export default FileItem
