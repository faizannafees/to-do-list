import { Table } from "antd";
import { useEffect, useState } from "react";

const UserTable = () => {

    const [userData, setUserData] = useState([]);

    const columns = [
        {
            title: 'Sr No.',
            dataIndex: 'id',
            key: 'id'
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            sorter: (a, b) => a.name.localeCompare(b.name)
        },
        {
            title: 'User Name',
            dataIndex: 'username',
            key: 'username'
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            sorter: (a, b) => a.email.localeCompare(b.email),
        },
        {
            title: 'Address',
            key: 'address',
            render: (_, record) => {
                const { street, suite, city, zipcode } = record.address;
                return (
                    <>
                        <p>{street}, {suite}, {city}, {zipcode}</p>
                    </>
                )
            }
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
            key: 'phone'
        },
        {
            title: 'Website',
            dataIndex: 'website',
            key: 'website'
        },
        {
            title: 'Company',
            dataIndex: ["company", "name"],
            key: 'company'
        }
    ];

    useEffect(() => {
        fetchUserData();
    }, []);

    const fetchUserData = async () => {
        let data = await fetch("https://jsonplaceholder.typicode.com/users");
        let json = await data.json();
        setUserData(json);
    }

    return (
        <div>
            <Table columns={columns} dataSource={userData} pagination={{ pageSize: 5 }} bordered scroll={{ x: 1000 }} />
        </div>
    )
}

export default UserTable;