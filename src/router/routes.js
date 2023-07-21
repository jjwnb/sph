// 引入路由组件
// import Home from "@/views/Home";
// import Search from "@/views/Search";
// import Login from "@/views/Login";
// import Register from "@/views/Register";
// import Detail from '@/views/Detail';
// import AddCartSuccess from '@/views/AddCartSuccess';
// import ShopCart from '@/views/ShopCart';
// import Trade from "@/views/Trade"
// import Pay from "@/views/Pay"
// import PaySuccess from '@/views/PaySuccess';
// import Center from "@/views/Center"
// // 二级路由组件
// import MyOrder from "@/views/Center/myOrder";
// import GroupOrder from "@/views/Center/groupOrder";
/**
 * 当打包构建应用时，JavaScript 包会变得非常大，影响页面加载。
 * 如果我们能把不同路由对应的组件分割成不同的代码块，
 * 然后当路由被访问的时候才加载对应组件，这样就会更加高效。
 */
// const foo = () => import('@/views/Home')


// 路由配置信息
export default [
    {
        path: '/center',
        component: () => import('@/views/Home'),
        meta: {
            show: true,

        },
        children: [
            {
                path: 'myorder',
                component: () => import('@/views/Home'),

            },
            {
                path: 'grouporder',
                component: () => import('@/views/Home'),

            },
            {
                path: '/center',
                redirect: "/center/myorder",


            }
        ]

    },
    {
        path: '/paysuccess',
        component: () => import('@/views/Home'),
        meta: {
            show: true,

        },
        beforeEnter: (to, from, next) => {
            if (from.path == "/pay") {
                next()
            } else {
                next(false)
            }
        }

    },
    {
        path: '/pay',
        component: () => import('@/views/Home'),
        meta: {
            show: true,

        },
        beforeEnter: (to, from, next) => {
            if (from.path == "/trade") {
                next()
            } else {
                next(false)
            }
        }

    },
    {
        path: '/trade',
        component: () => import('@/views/Home'),
        meta: {
            show: true,

        },
        // 路由独享守卫
        beforeEnter: (to, from, next) => {
            // 去交易页面必须从购物车来 
            if (from.path == '/shopcart') {
                next()
            } else {
                // 其他的路由组件而来停留在当前
                next(false)
            }
        }

    },
    {
        path: '/shopcart',
        component: () => import('@/views/Home'),
        meta: { show: true }

    },
    {
        path: '/addcartsuccess',
        name: 'addcartsuccess',
        component: () => import('@/views/Home'),
        meta: { show: true }

    },
    {
        path: '/detail/:skuid',
        component: () => import('@/views/Home'),
        meta: { show: true }
    },
    {
        path: "/home",
        component: () => import('@/views/Home'),
        meta: { show: true },
    },
    {
        name: "search",
        //keyWord加问号代表paramas参数可传可不传
        path: "/search/:keyword?",
        component: () => import('@/views/Home'),
        meta: { show: true },
        //路由组件能不能传递props数据?
        //1.布尔值写法 params
        //   props:true

        //2.对象写法：额外的给路由组件传递一些props
        // props: { a: 10, b: 2 },

        //3.函数写法：可以params参数，query参数通过props传递给路由组件
        // props({ params, query }) {
        //   return { keyWord: params.keWord, k: query.k };
        // },
    },
    {
        path: "/login",
        component: () => import('@/views/Home'),
        meta: { show: false },
    },
    {
        path: "/register",
        component: () => import('@/views/Home'),
        meta: { show: false },
    },

    // 重定向，在项目跑起来的时候，访问/,立马让他定向到首页
    {
        path: "*",
        redirect: "/home",
    },

]