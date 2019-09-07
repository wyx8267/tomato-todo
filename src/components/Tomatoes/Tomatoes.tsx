import * as React from 'react'
import { connect } from 'react-redux'
import axios from '../../config/axios'
import TomatoAction from './TomatoAction'
import { addTomato, initTomatoes, updateTomato } from '../../redux/actions/tomatoes'
import './Tomatoes.scss'

interface ITomatoesProps {
    addTomato: (payload: any) => any
    updateTomato: (payload: any) => any
    initTomatoes: (payload: any[]) => any
    tomatoes: any[]
}

class Tomatoes extends React.Component<ITomatoesProps> {
    constructor(props) {
        super(props)
    }
    componentDidMount() {
        this.getTomatoes()
    }
    get unfinishedTomato() {
        return this.props.tomatoes.filter(t => !t.description && !t.ended_at)[0]
    }
    getTomatoes = async () => {
        try {
            const response = await axios.get('tomatoes')
            this.props.initTomatoes(response.data.resources)
        } catch (e) {
            throw new Error(e)
        }
    }
    startTomato = async () => {
        try {
            const response = await axios.post('tomatoes', { duration: 1500000 })
            this.props.addTomato(response.data.resource)
        } catch (e) {
            throw new Error(e)
        }
    }
    render() {
        return (
            <div className="Tomatoes" id="Tomatoes">
                <TomatoAction startTomato={this.startTomato} unfinishedTomato={this.unfinishedTomato} updateTomato={this.props.updateTomato} />
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => ({
    tomatoes: state.tomatoes,
    ...ownProps
})
const mapDispatchToProps = {
    addTomato,
    initTomatoes,
    updateTomato
}

export default connect(mapStateToProps, mapDispatchToProps)(Tomatoes)