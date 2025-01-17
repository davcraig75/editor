import stringify from 'json-stringify-pretty-compact';
import * as React from 'react';
import MonacoEditor from 'react-monaco-editor';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { debounce } from 'vega';
import * as EditorActions from '../../actions/editor';
import './config-editor.css';

class ConfigEditor extends React.PureComponent<any, any> {
  public handleEditorChange = spec => {
    this.props.setConfig(JSON.parse(spec));
    (document.getElementById('config-select') as any).value = 'custom';
  };
  public render() {
    return (
      <div className="sizeFixEditorParent full-height-wrapper">
        <MonacoEditor
          options={{
            automaticLayout: true,
            cursorBlinking: 'smooth',
            folding: true,
            lineNumbersMinChars: 4,
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            wordWrap: 'on',
          }}
          ref="ConfigEditor"
          language="json"
          onChange={debounce(700, this.handleEditorChange)}
          value={stringify(this.props.config)}
        />
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    config: state.config,
  };
}

export function mapDispatchToProps(dispatch: Dispatch<EditorActions.Action>) {
  return bindActionCreators(
    {
      setConfig: EditorActions.setConfig,
    },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConfigEditor);
