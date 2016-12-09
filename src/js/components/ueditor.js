/**
 * Created by Lidy on 2016/12/3.
 */
import React from 'react';

var Ueditor = React.createClass({
    getDefaultProps(){
        return {
            content: '',
            id: 'editor'
        }
    },
    getInitialState(){
        return {
            editorDOM: null
        }
    },
    componentDidMount(){
        var editor = UE.getEditor(this.props.id);
        editor.ready(function (ueditor) {
            console.log(this.props.content)
            if (this.props.content) {
                editor.setContent(this.props.content);
            }

        }.bind(this));
        this.setState({
            editorDOM: editor
        })
    },
    render: function () {
        return (
            <script id={this.props.id} name="content" type="text/plain">
            </script>
        )
    }
})
export default Ueditor;