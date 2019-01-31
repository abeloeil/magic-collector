import * as React from 'react';
import mtg from 'mtgsdk';
import CardRow from './CardRow';

interface Props {

}

interface State {
  isLoading: boolean;
  q: string;
  result: any[];
  [x: string]: any;
}

export default class Search extends React.Component<Props, State> {
  _timeout: any;

  constructor(props: Props) {
    super(props);

    this.state = {
      isLoading: false,
      q: '',
      result: [],
    };

    this._timeout = null;
  }

  onChange = ({ target }: any)  => this.setState({
    [target.name]: target.value,
  }, () => {
    if (this._timeout) {
      clearTimeout(this._timeout);
    }

    this._timeout = setTimeout(() => {
      this.setState({
        result: [],
        isLoading: true,
      })
      this.search(target.value);
    }, 800);
  });

  search = (str: string) => {
    mtg.card.where({ name: str })
    .then(result => {
      this.setState({
        result,
        isLoading: false,
       });
    })
    .catch(console.warn);
  }

  render() {
    const { q, result } = this.state;

    return (
      <>
        <div>
          <input
            className="form-control"
            type="text"
            name="q"
            value={q}
            onChange={this.onChange}
          />
        </div>
        {
          q.length > 0  ?
            <table className="table">
            <thead>
              <tr>
                <th>Extension</th>
                <th>img</th>
                <th>Name</th>
                <th>Cost</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {
                result.length > 0 ?
                result.map(card => {
                  if (card.imageUrl) {
                    return (
                      <CardRow
                        {...card}
                        key={card.id}
                      />
                    )
                  }
                }) :
                <tr>
                  <td colSpan={5}>
                    <h4>
                      <i className="fa fa-warning"/>
                      0 résultats pour la recherche "{q}"
                    </h4>
                  </td>
                </tr>
              }
            </tbody>
          </table> : null
        }
      </>
    );
  }
}
