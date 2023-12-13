import { Outlet } from 'react-router-dom';
import AppHeader from './component/AppHeader';
import AppFooter from './component/AppFooter';
// import AppFooterSmall from '../shared/components/AppFooterSmall';

const PageWrapper = () => (
    <div>
        <div className="app-header">
            <AppHeader />
        </div>
        <div className="app-body">
            <Outlet />
        </div>
        <div className="app-footer">
            <AppFooter />
        </div>
    </div>
);

export default PageWrapper;
