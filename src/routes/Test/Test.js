import React from 'react';
import { connect } from 'dva';

@connect(({ test }) => {
    const { data } = test;
    return {
        data
    };
})


export default class Test extends React.Component {
    state = {

    }

    componentWillMount(){
        // this.props.dispatch({
        //     type : 'test/addUser',
        //     payload : {
        //         sd : '23',
        //         ds : '23'
        //     },
        //     callback : (res) => {
        //         console.log(res)
        //     }
        // })

        this.props.dispatch({
            type : 'test/addTest',
            callback : (res) => {
                console.log(res)
            }
        })
    }

    render(){
        const { data } = this.props;
        console.log(data)
        return(
            <div style={{textAlign:'center'}}>
                s
            </div>
        )
    }
}