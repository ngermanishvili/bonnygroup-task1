
"use client"
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

const SpinComponent: React.FC = () => <Spin indicator={<LoadingOutlined style={{ fontSize: 32, display: "flex", justifyContent: "center", alignItems: "center" }} spin />} />;

export default SpinComponent;