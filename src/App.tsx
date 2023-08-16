import React, { createElement } from 'react';
import './App.css';
import {Mark,Clause,Mention,Block,AgreementData } from './Interfaces';

import input from './input';

const App: React.FC = () => {
    const data: AgreementData[] = input;

    if (!data) {
        return <div>Loading...</div>;
    }

    const props = {data}

    return (
        <div className="app" style={{ 
            marginTop: '80px', 
                marginLeft: '80px',
                maxWidth: '700px'}}>
                <Agreement {...props} />
            </div>
    );
};

const Agreement: React.FC<{ data: AgreementData[]}> = (props) => {
    const { data } = props;
    return (
        <span>
            {data.map((item, index) => (
                <RenderItem item={item} key={index} />
            ))}
        </span>
    );
};

const RenderItem = ({ item }: { item:  Clause | Mention | Block | Mark }) => {
    if ('text' in item) {
        return <MarkComponent item={item as Mark}/>;
    }

    const children = (typeof item.children === 'undefined') ? [] : item.children;
    switch (item.type) {
        case 'clause':
        return <ClauseComponent item={item as Clause} />;
        case 'mention':
        return <MentionComponent item={item as Mention} />;
        case 'block':
        return <BlockComponent item={item as Block} />;
        default:
        return createElement(item.type, [], <Agreement data={children} />);
    }
};

const MarkComponent: React.FC<{ item: Mark }> = ({ item }) => {
    const { underline, bold, text } = item;
    const textWithBreaks = text.replace(/\n/g, '<br>');

    const style = { 
        fontWeight: bold !== undefined ? 'bold': 'normal', 
        textDecorationLine: underline !== undefined ? 'underline' : 'normal' 
    }

    return <span style={style} dangerouslySetInnerHTML={{ __html: textWithBreaks }} />;
};



const ClauseComponent: React.FC<{ item: Clause}> = ({ item}) => {
    const { children } = item;

    return <span><Agreement data={children} /></span>;
};

const MentionComponent: React.FC<{ item: Mention }> = ({ item }) => {
    const { color, value } = item;

    return (
        <span style={{ backgroundColor: color}}>
            {value}
        </span>
    )
};


const BlockComponent: React.FC<{ item: Block }> = ({ item }) => {
    const { children } = item;
    return (
        <Agreement data={children} />
        )
};


export default App;

