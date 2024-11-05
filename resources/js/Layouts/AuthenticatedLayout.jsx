import { useState } from 'react';
import { Link } from '@inertiajs/react';
import { Layout, Menu, Button} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { ProductOutlined, FileOutlined, ClockCircleOutlined, GroupOutlined, LogoutOutlined } from '@ant-design/icons';


const {Content, Footer, Header, Sider} = Layout

const items = [
    {
        label: <Link href={route('produit')}>Produits</Link> ,
        key: "produit",
        icon: <ProductOutlined />,
    },
    {
        label: <Link href={route('fournisseur')}>Fournisseurs</Link> ,
        key: "fournisseur",
        icon: <GroupOutlined />,
    },
    {
        label: <Link href={route('commande')}>Commandes</Link>,
        key: "commande",
        icon: <ClockCircleOutlined />,
    },
    {
        label: <Link href={route('rapport')}>Rapports</Link> ,
        key: "rapport",
        icon: <FileOutlined />,
    },
]

export default function Authenticated({ user, header, children }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);
    const [current, setCurrent] = useState(route().current())
    return (
       <div style={{
            backgroundColor: '#f0f0f0',
            minHeight: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundImage: 'url("/background.jpg")',
            backgroundSize: '100% auto',
            backgroundRepeat: 'no-repeat',
       }}>
            <Layout  style={{
                backgroundColor: "white",
                width: '90vw',
                maxWidth: '800px',
                height: '90vh',
                borderRadius: '1rem',
                position: 'relative',
                boxShadow: '5px 5px 15px 15px #afafaf70',
                padding: '0.5rem 1.5rem'
            }}>
                <Header style={{backgroundColor: "transparent"}}>
                    <div style={{display: "flex", alignItems: 'center'}}>
                        <Menu  onClick={(e)=>{setCurrent(e.key)}} selectedKeys={[current]} mode='horizontal' items={items}></Menu>
                        <Link style={{marginLeft: 'auto'}} href={route('logout')}><Button  icon={<LogoutOutlined></LogoutOutlined>} type='primary' danger>Se déconnecter</Button></Link>
                    </div>
                </Header>
                <Content style={{
                    padding: "1rem",
                    height: '100%',
                    overflowY: 'auto',
                    position: 'relative',
                }}>
                    {children}
                </Content>
            </Layout>
       </div>
       
    );
}
