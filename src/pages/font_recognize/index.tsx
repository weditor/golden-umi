import * as React from 'react';
import {
  List,
  Button,
  PrimaryButton,
  Modal,
  IDragOptions,
  ContextualMenu,
  TextField,
  getTheme,
  DefaultButton,
  Image,
  ImageFit,
  Icon,
  ITheme,
  mergeStyleSets,
  getFocusStyle,
  FocusZone,
  FocusZoneDirection,
} from 'office-ui-fabric-react';
import AddImageForm from './components/addImageForm';
import Axios from 'axios';
import { history } from 'umi';

export interface IListBasicExampleProps {
  items?: ImageFileType[];
}

export interface IListBasicExampleState {
  filterText?: string;
  items?: [];
}

interface IListBasicExampleClassObject {
  itemCell: string;
  itemImage: string;
  itemContent: string;
  itemName: string;
  itemIndex: string;
  chevron: string;
}

const theme: ITheme = getTheme();
const { palette, semanticColors, fonts } = theme;

const classNames: IListBasicExampleClassObject = mergeStyleSets({
  itemCell: [
    getFocusStyle(theme, { inset: -1 }),
    {
      minHeight: 54,
      padding: 10,
      boxSizing: 'border-box',
      borderBottom: `1px solid ${semanticColors.bodyDivider}`,
      display: 'flex',
      selectors: {
        '&:hover': { background: palette.neutralLight },
      },
    },
  ],
  itemImage: {
    flexShrink: 0,
  },
  itemContent: {
    marginLeft: 10,
    overflow: 'hidden',
    flexGrow: 1,
  },
  itemName: [
    fonts.xLarge,
    {
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
  ],
  itemIndex: {
    fontSize: fonts.small.fontSize,
    color: palette.neutralTertiary,
    marginBottom: 10,
  },
  chevron: {
    alignSelf: 'center',
    marginLeft: 10,
    color: palette.neutralTertiary,
    fontSize: fonts.large.fontSize,
    flexShrink: 0,
  },
});

class ImageIndex extends React.Component<any, any> {
  state = {
    addModalVisible: false,
    inputFile: null,
    images: [],
  };
  inputRef: any = null;
  componentWillMount() {
    Axios.get('/font_api/image/')
      .then(req => req.data)
      .then(jsData => {
        console.log(jsData);
        this.setState({ images: jsData.results });
      });
  }
  render() {
    const _dragOptions: IDragOptions = {
      moveMenuItemText: 'Move',
      closeMenuItemText: 'close',
      menu: ContextualMenu,
    };
    return (
      <div>
        <PrimaryButton
          iconProps={{ iconName: 'Add' }}
          onClick={this._openModal}
          style={{ marginBottom: 10 }}
        >
          新建
        </PrimaryButton>
        <FocusZone direction={FocusZoneDirection.vertical}>
          <List items={this.state.images} onRenderCell={this._onRenderCell} />
        </FocusZone>
        <Modal
          titleAriaId="addImage"
          isOpen={this.state.addModalVisible}
          onDismiss={this._closeModal}
          isBlocking={false}
          dragOptions={undefined}
        >
          <div style={{ padding: 17, width: 500 }}>
            <AddImageForm onFinish={() => console.log('finish')} />
          </div>
        </Modal>
      </div>
    );
  }
  private _closeModal = (): void => {
    this.setState({ addModalVisible: false });
  };
  private _openModal = (): void => {
    this.setState({ addModalVisible: true });
  };
  private _onRenderCell(
    item: ImageFileType,
    index: number | undefined,
  ): JSX.Element {
    return (
      <div
        className={classNames.itemCell}
        data-is-focusable={true}
        onClick={() => history.push(`/font_rec/detail/${item.id}/`)}
      >
        <Image
          className={classNames.itemImage}
          //   src={item.thumbnail}
          width={50}
          height={50}
          imageFit={ImageFit.cover}
        />
        <div className={classNames.itemContent}>
          <div className={classNames.itemName}>{item.name}</div>
          <div className={classNames.itemIndex}>{`Item ${index}`}</div>
          <div>{item.description}</div>
        </div>
        <Icon className={classNames.chevron} iconName={'ChevronRight'} />
      </div>
    );
  }
}

export default ImageIndex;
