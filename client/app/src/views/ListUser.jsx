import React, { useState, useEffect } from 'react';
import {
    Layout,
    Menu,
    Table,
    Input,
    Button,
    Dropdown,
    Tag,
    Checkbox,
    Modal,
    Form,
    message,
    Typography,
} from 'antd';
import {
    EditOutlined,
    DeleteOutlined,
    PlusOutlined,
    EllipsisOutlined,
} from '@ant-design/icons';

const { Header, Content, Sider } = Layout;
const { Title } = Typography;

const App = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedKeys, setSelectedKeys] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [currentRecord, setCurrentRecord] = useState(null);

    // Fetch users from API
    const fetchUsers = async () => {
        setLoading(true);
        try {
            const response = await fetch('http://localhost:8889/api/user');
            const result = await response.json();
            if (result.success) {
                setUsers(result.data.map((user, index) => ({ ...user, key: user.id || index })));
            } else {
                message.error('Failed to fetch users');
            }
        } catch (error) {
            message.error('Error fetching users');
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchUsers();
    }, []);
    // Fetch user by ID and open modal
    const fetchUserById = async (id) => {
        setLoading(true);
        try {
            const response = await fetch(`http://localhost:8889/api/user/${id}`);
            const result = await response.json();

            if (result.success) {
                setCurrentRecord(result.data);
                setIsModalVisible(true); // Open modal after fetching data
            } else {
                message.error('Failed to fetch user details');
            }
        } catch (error) {
            message.error('Error fetching user details');
        }
        setLoading(false);
    };
    // Handle form submit
    const handleFormSubmit = async (values) => {
        const url = currentRecord
            ? `http://localhost:8889/api/user/update/${currentRecord.id}`
            : 'http://localhost:8889/api/user/create';
        const method = currentRecord ? 'PUT' : 'POST';

        try {
            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(values),
            });
            const result = await response.json();

            if (result.success) {
                message.success(currentRecord ? 'User updated successfully' : 'User created successfully');

                if (currentRecord) {
                    // Update user in the local list
                    setUsers((prevUsers) =>
                        prevUsers.map((user) =>
                            user.id === currentRecord.id ? { ...user, ...values } : user
                        )
                    );
                } else {
                    // Add new user to the local list
                    const newUser = { ...values, id: result.data.id }; // Assuming the API returns the new ID
                    setUsers((prevUsers) => [...prevUsers, newUser]);
                }

                setIsModalVisible(false);
                setCurrentRecord(null);
            } else {
                message.error(result.message || 'Failed to save user');
            }
        } catch (error) {
            message.error('Error saving user');
        }
    };


    // Delete user
    const deleteUser = async (id) => {
        try {
            const response = await fetch(`http://localhost:8889/api/user/delete/${id}`, {
                method: 'DELETE',
            });
            const result = await response.json();
            if (result.success) {
                setUsers((prev) => prev.filter((user) => user.id !== id));
                message.success('User deleted successfully');
            } else {
                message.error('Failed to delete user');
            }
        } catch (error) {
            message.error('Error deleting user');
        }
    };

    // Handle checkbox changes
    const handleCheckboxChange = (e, key) => {
        setSelectedKeys((prev) => (e.target.checked ? [...prev, key] : prev.filter((item) => item !== key)));
    };

    // Select all checkboxes
    const handleSelectAll = (e) => {
        setSelectedKeys(e.target.checked ? users.map((user) => user.key) : []);
    };

    // Cancel Modal
    const handleModalCancel = () => {
        setIsModalVisible(false);
        setCurrentRecord(null);
    };

    // Table columns
    const columns = [
        { title: 'Name', dataIndex: 'name', key: 'name' },
        {
            title: 'Date of Birth',
            dataIndex: 'dob',
            key: 'dob',
            render: (dob) => (dob ? new Date(dob).toLocaleDateString() : 'N/A'),
        },
        { title: 'Email', dataIndex: 'email', key: 'email' },
        { title: 'City', dataIndex: 'city', key: 'city' },
        {
            title: 'Gender',
            dataIndex: 'gender',
            key: 'gender',
            render: (gender) => <Tag color={gender === 'Male' ? 'blue' : 'pink'}>{gender}</Tag>,
        },
        {
            title: 'Actions',
            key: 'action',
            render: (_, record) => (
                <Dropdown
                    overlay={
                        <Menu>
                            <Menu.Item
                                key="edit"
                                icon={<EditOutlined />}
                                onClick={() => fetchUserById(record.id)} // Call fetchUserById with record.id
                            >
                                Edit
                            </Menu.Item>
                            <Menu.Item
                                key="delete"
                                icon={<DeleteOutlined />}
                                onClick={() => deleteUser(record.id)}
                            >
                                Delete
                            </Menu.Item>
                        </Menu>
                    }
                    trigger={['click']}
                >
                    <Button icon={<EllipsisOutlined />} />
                </Dropdown>
            ),
        },
    ];

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider style={{ background: 'rgb(56,63,81,100)' }}>
                <Title level={4} style={{ color: 'white', padding: 16 }}>
                    User Management
                </Title>
            </Sider>
            <Layout>
                <Header style={{ background: '#fff', padding: 16 }}>
                    <Button
                        type="primary"
                        icon={<PlusOutlined />}
                        onClick={() => setIsModalVisible(true)}
                    >
                        Add User
                    </Button>
                </Header>
                <Content style={{ padding: 16 }}>
                    <Table
                        dataSource={users}
                        columns={columns}
                        loading={loading}
                        rowSelection={{
                            selectedRowKeys: selectedKeys,
                            onChange: setSelectedKeys,
                        }}
                    />
                </Content>
            </Layout>

            {/* Modal for Create/Edit */}
            <Modal
                visible={isModalVisible}
                onCancel={handleModalCancel}
                title={currentRecord ? 'Edit User' : 'Create User'}
                footer={null}
            >
                <Form
                    layout="vertical"
                    onFinish={handleFormSubmit}
                    initialValues={currentRecord || { gender: 'Male' }}
                    key={currentRecord ? currentRecord.id : 'new-form'}
                >
                    <Form.Item
                        label="Name"
                        name="name"
                        rules={[{ required: true, message: 'Please enter the name' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            { required: true, message: 'Please enter the email' },
                            { type: 'email', message: 'Invalid email format' },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="City"
                        name="city"
                        rules={[{ required: true, message: 'Please enter the city' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Date of Birth"
                        name="dob"
                        rules={[{ required: true, message: 'Please select the date of birth' }]}
                    >
                        <Input type="date" />
                    </Form.Item>
                    <Form.Item
                        label="Gender"
                        name="gender"
                        rules={[{ required: true, message: 'Please select the gender' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            {currentRecord ? 'Update' : 'Create'}
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </Layout>
    );

};

export default App;
