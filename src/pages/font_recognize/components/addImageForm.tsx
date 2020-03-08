import * as React from 'react';
import {
  PrimaryButton,
  Modal,
  IDragOptions,
  ContextualMenu,
  TextField,
  getTheme,
  DefaultButton,
} from 'office-ui-fabric-react';
import Axois from 'axios';
const theme = getTheme();

interface AddImageFormProps {
  onFinish: (values: any) => void;
}
class AddImageForm extends React.Component<AddImageFormProps, any> {
  inputRef: any = null;
  state = {
    inputFile: null,
    name: '',
    description: '',
    error: '',
  };
  render() {
    return (
      <div>
        <div style={theme.fonts.xLargePlus}>新增待识别图片</div>
        <input
          ref={ref => (this.inputRef = ref)}
          type="file"
          style={{ display: 'none' }}
          onChange={this._onFileInputChange}
        />
        <TextField
          required
          label="选择图片"
          readOnly={true}
          style={{ cursor: 'pointer' }}
          onClick={() => this.inputRef.click()}
          value={this.state.inputFile ? this.state.inputFile.name : ''}
        />
        <TextField
          label="名称"
          value={this.state.name}
          onChange={e => this.setState({ name: e.target.value })}
          required
        ></TextField>
        <TextField label="描述" multiline={true}></TextField>
        <div style={{ color: 'red' }}>{this.state.error}</div>
        <div style={{ margin: '5px 0px' }}>
          <PrimaryButton style={{ marginRight: 10 }} onClick={this._saveImage}>
            保存
          </PrimaryButton>
          <DefaultButton>取消</DefaultButton>
        </div>
      </div>
      //   </Modal>
    );
  }
  private _onFileInputChange = (e: any): void => {
    if (e.target.files && e.target.files.length) {
      this.setState({ inputFile: e.target.files[0] });
    }
  };
  private _saveImage = (): void => {
    if (!this.state.name || !this.state.inputFile) {
      this.setState({ error: '文件以及名称是必填项' });
      return;
    }
    let formData = new FormData();
    formData.append('image', this.state.inputFile);
    formData.append('name', this.state.name);
    formData.append('description', this.state.description);
    Axois.post('/font_api/image/', formData)
      .then(req => req.data)
      .then(jsData => console.log(jsData));
  };
}

export default AddImageForm;
