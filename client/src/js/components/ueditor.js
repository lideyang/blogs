/**
 * Created by Lidy on 2016/12/3.
 */
import React, {Component} from 'react';

export default class Ueditor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            editorDOM: null
        };
    }

    static defaultProps = {
        content: '',
        id: 'editor'
    }

    componentDidMount() {
        if (__DEVCLIENT__) {
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
        }
    }

    render() {
        return (
            <script id={this.props.id} name="content" type="text/plain">
            </script>
        )
    }
}