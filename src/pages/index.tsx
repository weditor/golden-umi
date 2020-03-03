import React from 'react';
import styles from './index.less';
import { PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import { CommandBar, ICommandBarItemProps } from 'office-ui-fabric-react';
import { history } from 'umi';
import { initializeIcons } from '@uifabric/icons';
initializeIcons();


const _items: Array<ICommandBarItemProps> = [
    {
        key: "home",
        text: "主页",
        iconProps: { iconName: "Home" },
        onClick: () => history.push('/')
    },
    {
        key: "conference",
        text: "会议",
        iconProps: { iconName: "Glasses" },
        subMenuProps: {
            items: [
                {
                    key: "conferenceTopic",
                    text: "演讲主题",
                    iconProps: { iconName: "Brightness" },
                    onClick: () => history.push('/conference/topic/')
                },
                {
                    key: "conference",
                    text: "主持会议",
                    iconProps: { iconName: "TrackersMirrored" },
                    onClick: () => history.push('/conference/meeting/')
                }
            ]
        }
    }
]

const _farItems: Array<ICommandBarItemProps> = [
    {
        key: "login",
        text: "用户",
        iconProps: { iconName: "UserOptional" },
    }
]

const MyCommandBar: React.FunctionComponent = () => {
    return (<CommandBar items={_items} farItems={_farItems} ariaLabel="Use Left and Right arrow keys to navigate commands" />)
}

fetch('/graphql/').then(req => req.headers).then(data => {
    data.forEach((value, key) => console.log(value, key))
})
export default (props: any) => {
    return (
        <div>
            <MyCommandBar />
            <div>
                {props.children}
            </div>
            {/* <h1 className={styles.title}>Page index</h1>
            <div><PrimaryButton iconProps={{ iconName: 'Home' }}>Hello, I'm button</PrimaryButton></div> */}
        </div>
    );
}
