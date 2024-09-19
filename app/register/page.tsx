'use client'
import { authService } from "@/service/service";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Input, Form, message } from "antd";
import Link from "next/link";
import React, {  useState } from "react";

const Page: React.FC = () => {
    const [form] = Form.useForm();
const [info,setInfo]=useState()
    const handleSubmit = (values: any) => {
        // Exclude confirmPassword from the values object before sending to server
        const { confirmPassword, ...formData } = values;
        console.log('Form Submitted:', formData);
        // Handle form submission logic here
        setInfo(formData)
        authService
        .signUp(info)
        .then((res) => {
          console.log('Sign up successful:', res.data);
          // Handle successful sign-up
          message.success('Đăng ký thành công');
        })
        .catch((err) => {
          console.error('Sign up failed:', err);
          message.error(`lỗi:${err.response.data.message}`);
        });

    };

// useEffect(()=>{
//   authService
//   .signUp(info)
//   .then((res) => {
//     console.log('Sign up successful:', res.data);
//     // Handle successful sign-up
//   })
//   .catch((err) => {
//     console.error('Sign up failed:', err);
//     // Handle sign-up failure
//   });
// },[info])



    return (
        <div className="mt-28 w-1/3 bg-white border rounded-2xl flex flex-col p-5 gap-5 pb-8">
            <div className="flex justify-center items-center w-full text-beamin font-semibold text-[26px]">
                Đăng Kí
            </div>
            <Form
                form={form}
                onFinish={handleSubmit}
                layout="vertical"
                className="flex flex-col gap-3"
            >
                <Form.Item name="user_name" label="Tên đăng nhập" rules={[{ required: true, message: 'Vui lòng nhập tên đăng nhập!' }]}>
                    <Input
                        placeholder="Tên đăng nhập"
                        className="h-[40px]"
                    />
                </Form.Item>
                <Form.Item name="phone_number" label="Số điện thoại" rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]}>
                    <Input
                        placeholder="Số điện thoại"
                        className="h-[40px]"
                    />
                </Form.Item>
                <Form.Item name="email" label="Email" rules={[{ required: true, message: 'Vui lòng nhập email!' }]}>
                    <Input
                        placeholder="Email"
                        className="h-[40px]"
                    />
                </Form.Item>
                <Form.Item name="password" label="Mật khẩu" rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}>
                    <Input.Password
                        placeholder="Mật khẩu"
                        className="h-[40px]"
                        iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                    />
                </Form.Item>
                <Form.Item
                    name="confirmPassword"
                    label="Nhập lại mật khẩu"
                    dependencies={['password']}
                    rules={[
                        { required: true, message: 'Vui lòng xác nhận mật khẩu!' },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('Mật khẩu không khớp!'));
                            },
                        }),
                    ]}
                >
                    <Input.Password
                        placeholder="Nhập lại mật khẩu"
                        className="h-[40px]"
                        iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                    />
                </Form.Item>
                <Form.Item>
                    <button className="w-full h-[40px] uppercase text-white bg-beamin rounded-lg">
                        Đăng Kí
                    </button>
                </Form.Item>
            </Form>
            <div className="flex items-center justify-center gap-1">
                <span className="text-gray-600">Bạn đã có tài khoản?</span>
                <Link className="text-beamin cursor-pointer" href="/login">Đăng nhập</Link>
            </div>
        </div>
    );
}

export default Page;
