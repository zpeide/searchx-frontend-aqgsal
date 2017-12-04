import './Header.css';
import React from 'react';

import Logo from './Logo';
import Search from './SearchBar';
import Task from '../../Survey/Task';

import account from '../../../stores/AccountStore';
import TaskStore from '../../../stores/TaskStore';

////

var steps = [
    {
        element: '#intro-system',
        intro: 'We want you to use our custom Web search system (we call it "SearchX") to learn about a given topic.',
        position: 'bottom-middle-aligned'
    },
    {
        element: '#intro-topic',
        intro: 'Learn about this topic.'
    },
    {
        element: '#intro-terms',
        intro: 'These are key terms/phrases about this topic that you may use to formulate your queries.'
    },
    {
        element: '#intro-search-bar',
        intro: 'Use this tool to search for documents about the topic - and to browse/read them of course.'
    },
    {
        element: '#intro-counter',
        intro: 'You will need to learn about the topic for 15 minutes. Afterwards, you can press the button to take the final test.'
    }
];

var intro = introJs().setOptions({
    steps: steps,
    doneLabel:  "Ok!",  
    showStepNumbers: false, 
    showBullets: false
});

intro.oncomplete(function() {
    localStorage.setItem("intro", true);
    var start = localStorage.getItem("counter-start") || Date.now();
    localStorage.setItem("counter-start",start);
    location.reload();
});
////

export default class Header extends React.Component {

    componentDidMount(){
        var topicId = account.getTopicId();
        if (!localStorage.getItem("intro")) {
            intro.start();
        }
    }
    
    render() {
        var task = {
            topicId: account.getTopicId(),
            type: account.getTaskType(),
            duration: account.getTaskDuration()
        }

        return (
            <div className="row Header" id="intro-system">
                <div className="col-sm-12 col-sm-1 text-center Header-logo">
                    <Logo />
                </div>
                <div className="col-sm-12 col-sm-4">
                    <Search userId={account.getId()} task={task} />
                </div>
                {task.topicId &&
                    <div className="col-sm-12 col-sm-5 pull-right">
                        <Task userId={account.getId()} task={task} />
                    </div>
                }
            </div>
        )
    }
}
