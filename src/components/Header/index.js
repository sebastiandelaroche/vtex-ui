import { PageHeader } from 'antd';

const Header = () => (
  <div style={{ backgroundColor: '#F71963' }}>
    <PageHeader
      className="site-page-header"
      title={<span style={{ color: '#FFFFFF' }}>Vtex</span>}
    />
  </div>
);

export default Header;
