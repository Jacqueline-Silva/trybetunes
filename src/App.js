import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Login from './pages/Login';
import Search from './pages/Search';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import NotFound from './pages/NotFound';
import Loading from './pages/Loading';
import { createUser, getUser } from './services/userAPI';
import Header from './components/Header';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      nameInput: '',
      loading: false,
      redirect: false,
    };

    this.handleProfile = this.handleProfile.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.inputChange = this.inputChange.bind(this);
  }

  componentDidMount() {
    this.handleProfile();
  }

  async handleClick() {
    const { nameInput } = this.state;
    this.setState({
      loading: true,
    });

    await createUser({ name: nameInput });

    this.setState({
      loading: false,
      redirect: true,
    });
  }

  async handleProfile() {
    this.setState({
      loading: true,
    });

    const result = await getUser();
    const { name } = result;

    this.setState({
      nameInput: name,
      loading: false,
    });
  }

  inputChange({ target }) {
    this.setState({
      nameInput: target.value,
    });
  }

  render() {
    const { nameInput, loading, redirect } = this.state;

    return (
      <>
        {
          loading && <Loading />
        }

        <h1>TrybeTunes</h1>
        <Header nameInput={ nameInput } />
        <Switch>
          <Route exact path="/">
            <Login
              inputChange={ this.inputChange }
              nameInput={ nameInput }
              handleClick={ this.handleClick }
              redirect={ redirect }
            />
          </Route>

          <Route path="/search" component={ Search } />
          <Route path="/album/:id" component={ Album } />
          <Route path="/favorites" component={ Favorites } />
          <Route path="/profile" component={ Profile } exact />
          <Route path="/profile/edit" component={ ProfileEdit } exact />
          <Route path="*" component={ NotFound } />
        </Switch>
      </>
    );
  }
}

export default App;
