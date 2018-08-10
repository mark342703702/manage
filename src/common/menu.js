import { isUrl } from '../utils/utils';

const menuData = [
  {
    name: '人员管理',
    icon: 'team',
    path: 'admin',
    children: [
      {
        name: '添加管理员',
        path: 'addAdmin',
        icon: 'user-add',
      }
    ]
  },
  {
    name: '测试',
    icon: 'dashboard',
    path: 'test',
    children: [
      {
        name: '分析页',
        path: 'test',
      }
    ]
  }
];

function formatter(data, parentPath = '/', parentAuthority) {
  return data.map(item => {
    let { path } = item;
    if (!isUrl(path)) {
      path = parentPath + item.path;
    }
    const result = {
      ...item,
      path,
      authority: item.authority || parentAuthority,
    };
    if (item.children) {
      result.children = formatter(item.children, `${parentPath}${item.path}/`, item.authority);
    }
    return result;
  });
}

export const getMenuData = () => formatter(menuData);
