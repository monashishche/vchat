import React from 'react';
import {Button, Modal} from 'antd';
import {useForm} from 'react-hook-form';
import {useDispatch, useSelector} from 'react-redux';
import {createChat} from '../../actions/chats';

export default function CrateChatModal({visible, setVisibility}) {
    const {register, handleSubmit} = useForm();
    const user = useSelector(({auth}) => auth.user);
    const dispatch = useDispatch();

    const onSubmit = data => {
        dispatch(createChat(data, user.uid))
            .then(_ => setVisibility(false));
    };

    const handleCancel = () => {
        setVisibility(false);
    };

    return (
        <Modal
            visible={visible}
            title="Create chat"
            onOk={handleSubmit(onSubmit)}
            onCancel={handleCancel}
            bodyStyle={{padding: 0}}
            footer={[
                <Button key="back" onClick={handleCancel}>
                    Cancel
                </Button>,
                <Button key="submit" type="primary" onClick={handleSubmit(onSubmit)}>
                    Create
                </Button>,
            ]}
        >
            <div className="centered-view">
                <div className="centered-container">
                    <form className="centered-container-form small-form create-chat-in-modal">
                        <div className="form-container">
                            <div className="form-group">
                                <label htmlFor="name">Name</label>
                                <input
                                    {...register("name")}
                                    type="text"
                                    className="form-control"
                                    id="name"
                                    name="name"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="description">Description</label>
                                <textarea
                                    {...register("description")}
                                    name="description"
                                    className="form-control"
                                    id="description">
                                    </textarea>
                            </div>
                            <div className="form-group">
                                <label htmlFor="image">Image</label>
                                <input
                                    {...register("image")}
                                    type="text"
                                    className="form-control"
                                    id="image"
                                    name="image"
                                />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </Modal>
    );
}