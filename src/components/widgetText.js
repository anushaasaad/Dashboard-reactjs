import React from 'react'

function widgetText(props) {
         return (
                <div className="widgetWrap">
                    <div className="widgetTitle">
                        {props.title}
                    </div>
                    <div className="widgetValue">
                        <div className="value">{props.value}</div>
                        <div className="description">{props.description}</div>
                    </div>

                </div>
    )
}
export default widgetText;