import * as React from 'react';

interface Props {
    name: string;
    setName: string;
    imageUrl: string;
    manaCost: string;
}

interface State {
    showImage: boolean;
}

export default class CardRow extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            showImage: false,
        };
    }

    show = () => this.setState({ showImage: true });
    leave = () => this.setState({ showImage: false });

    render() {
        const {
            name,
            setName,
            imageUrl,
            manaCost,
        } = this.props;

        const { showImage } = this.state;

        return (
            <tr>
                <td>{setName}</td>
                <td style={{ position: 'relative' }}>
                <i
                    className="fa fa-camera"
                    onMouseEnter={this.show}
                    onMouseLeave={this.leave}
                />
                <img
                    src={imageUrl}
                    style={{
                        display: showImage ? 'block' : 'none',
                        position: 'absolute',
                        zIndex: 9999,
                    }}
                />
                </td>
                <td>{name}</td>
                <td>{manaCost}</td>
                <td>+</td>
            </tr>
        );
    }
}
