import { useEffect, useState } from "react"
import { getServerSideProps } from "../lib/api-service"
import { Layout, Card, List, Button, Row, Col, Radio } from 'antd';
import 'antd/dist/antd.min.css';

//The React Test for Random User List
//Creator : Mengzhe Liu
function HomePage() {
    //
    const { Header, Content } = Layout;
    const { Meta } = Card;
    const options = [
        { label: 'All', value: 'all' },
        { label: 'Male', value: 'male' },
        { label: 'Female', value: 'female' },
    ];
    const [user, setUser] = useState([]);
    const [selectedGender, setSelectedGender] = useState("all");
    const userNum = 8;//load 8 user at a time
    //call api to get data of 8 users and save them to user
    async function fetchData() {
        let data = await getServerSideProps(userNum);
        setUser([...user, ...data.results]);
    }

    function onChange(e) {
        setSelectedGender(e.target.value);
    }

    useEffect(() => {
        fetchData();
    }, [])


    return (
        <>
            <Layout className="layout">
                <Header>
                    <Row>
                        <h2 style={{ color: "white" }}>Random User List</h2>
                        // Radio to filter gender of users
                        <Radio.Group
                            options={options}
                            style={{ position: 'absolute', top: '15px', right: '150px' }}
                            onChange={onChange}
                            optionType="button"
                            buttonStyle="solid"
                        />
                        //load 8 more users
                        <Button style={{ position: 'absolute', top: '15px', right: '10px' }} onClick={fetchData}>Load More</Button>
                    </Row>
                </Header>
                <Content style={{ padding: '0 50px' }}>
                    {/* display the user card */}
                    {/* //the selectedGender will filter the gender of users */}
                    <List
                        grid={{ gutter: 16, column: 4 }}
                        dataSource={selectedGender === "all" ? user : user.filter(u => u.gender === selectedGender)}
                        renderItem={item => (
                            <List.Item>
                                <Card
                                    hoverable
                                    style={{ width: 240 }}
                                    cover={<img alt={item.name.first} src={item.picture.medium} />}
                                >
                                    <Meta title={`${item.name.first} ${item.name.last}`} description={item.email} />
                                </Card>
                            </List.Item>
                        )}
                    />
                </Content>
            </Layout>
        </>
    )

}


export default HomePage