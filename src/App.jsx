import { Component } from "react";
import "./App.css";
import Button from "./components/Button/Button";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import Searchbar from "./components/Searchbar/Searchbar";
import * as API from "./components/services/api";
import Loader from "./components/Loader/Loader";

const API_KEY = "38952282-40725538619d219cb8ed057cd";

export default class App extends Component {
  state = {
    gallery: [],
    searchValue: "",
    page: 1,
    totalImgs: 0,
    status: "idle",
  };

  async componentDidUpdate(prevProps, prevState) {
    const { searchValue, page } = this.state;

    if (prevState.searchValue !== searchValue || prevState.page !== page) {
      this.setState({ status: "pending" });
      try {
        const res = await API.searchImgs(searchValue, API_KEY, page);
        // console.log("res: ", res);

        if (res.totalHits === 0) {
          return this.setState({
            status: "rejected",
          });
        }
        this.setState((s) => ({
          gallery: [...s.gallery, ...res.hits],
          totalImgs: res.totalHits,
          status: "resolved",
        }));
      } catch (error) {
        this.setState({
          status: "rejected",
        });
        // console.log(error);
      }
    }
  }

  onSubmit = (values) => {
    if (values.search === this.state.searchValue) {
      alert("Ви це вже знайшли");
      return;
    }
    this.setState({ searchValue: values.search, gallery: [], page: 1 });
  };

  onLoadMore = () => {
    this.setState((s) => ({ page: s.page + 1 }));
  };

  render() {
    const { gallery, searchValue, totalImgs, status } = this.state;

    return (
      <div className="App">
        <Searchbar onSubmit={this.onSubmit} />
        {status === "idle" && (
          <p className="start-text">Please enter your request</p>
        )}
        {status === "rejected" && (
          <p className="start-text">
            Sorry, no result at your request "{searchValue}"
          </p>
        )}

        <ImageGallery
          items={gallery}
          status={status}
          searchValue={searchValue}
        />

        {status === "pending" && <Loader />}

        {gallery.length !== 0 && totalImgs > 12 && gallery.length % 2 === 0 && (
          <Button onClick={this.onLoadMore} classname={"Button"}>
            Load more
          </Button>
        )}
      </div>
    );
  }
}
