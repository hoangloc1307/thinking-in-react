import React from 'react';
import './style.css';

class ProductRow extends React.Component {
  render() {
    const { product } = this.props;

    return product.stocked ? (
      <tr>
        <td>{product.name}</td>
        <td>{product.price}</td>
      </tr>
    ) : (
      <tr>
        <td style={{ color: 'red' }}>{product.name}</td>
        <td>{product.price}</td>
      </tr>
    );
  }
}

class ProductCategoryRow extends React.Component {
  render() {
    return (
      <tr colSpan="2" style={{ fontWeight: 'bold' }}>
        {this.props.category}
      </tr>
    );
  }
}

class ProductTable extends React.Component {
  render() {
    const rows = [];
    const { products, filter, inStock } = this.props;
    let category = '';

    products.map((product) => {
      if (product.name.indexOf(filter) == -1 || (inStock && !product.stocked)) {
        return null;
      }
      if (product.category !== category) {
        rows.push(<ProductCategoryRow category={product.category} />);
      }
      rows.push(<ProductRow product={product} />);
      category = product.category;
    });

    return (
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    );
  }
}

class SearchBar extends React.Component {
  handleInputChange = (e) => {
    const name = e.target.name;
    const value =
      e.target.type == 'checkbox' ? e.target.checked : e.target.value;
    this.props.onInputChange(name, value);
  };

  render() {
    const { filter, inStock } = this.props;

    return (
      <form>
        <input
          type="text"
          name="filter"
          value={filter}
          onChange={this.handleInputChange}
        />
        <p>
          <input
            type="checkbox"
            name="inStock"
            checked={inStock}
            onChange={this.handleInputChange}
          />{' '}
          Only show products in stock
        </p>
      </form>
    );
  }
}

class FilterableProductTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: '',
      inStock: false,
    };
  }

  handleInputChange = (name, value) => {
    this.setState({
      [name]: value,
    });
  };

  render() {
    const { products } = this.props;
    const { filter, inStock } = this.state;
    return (
      <React.Fragment>
        <SearchBar
          filter={filter}
          inStock={inStock}
          onInputChange={this.handleInputChange}
        />
        <ProductTable products={products} filter={filter} inStock={inStock} />
      </React.Fragment>
    );
  }
}

export default function App() {
  const PRODUCTS = [
    {
      category: 'Sporting Goods',
      price: '$49.99',
      stocked: true,
      name: 'Football',
    },
    {
      category: 'Sporting Goods',
      price: '$9.99',
      stocked: true,
      name: 'Baseball',
    },
    {
      category: 'Sporting Goods',
      price: '$29.99',
      stocked: false,
      name: 'Basketball',
    },
    {
      category: 'Electronics',
      price: '$99.99',
      stocked: true,
      name: 'iPod Touch',
    },
    {
      category: 'Electronics',
      price: '$399.99',
      stocked: false,
      name: 'iPhone 5',
    },
    {
      category: 'Electronics',
      price: '$199.99',
      stocked: true,
      name: 'Nexus 7',
    },
  ];
  return <FilterableProductTable products={PRODUCTS} />;
}
