import RenderAuthorized from '../components/Authorized';
import { getAuthority } from './authority';

//权限系统
let Authorized = RenderAuthorized(getAuthority()); // eslint-disable-line

// 重载权限系统
const reloadAuthorized = () => {
  Authorized = RenderAuthorized(getAuthority());
};

export { reloadAuthorized };
export default Authorized;
