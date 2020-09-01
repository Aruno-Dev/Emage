import React from 'react'
import Spinner from './Spinner'
import SpinnerCircle from './SpinnerCircle'
import SpinnerDotsScale from './SpinnerDotsScale'
import '../../resources/static/assets/scss/loading.scss'
const spinners = [Spinner, SpinnerCircle, SpinnerDotsScale]
export default class Loading extends React.Component {
  constructor() {
    super()
    this.state = {
      spinner: 2,
    }
  }

  next() {
    let spinner = this.state.spinner
    spinner++
    if (spinner >= spinners.length) {
      spinner = 0
    }
    this.setState({ spinner })
  }

  render() {
    const { spinner } = this.state
    const SpinnerSelected = spinners[spinner]
    return (
      <div onClick={this.next.bind(this)}>
        <SpinnerSelected />
      </div>
    )
  }
}
