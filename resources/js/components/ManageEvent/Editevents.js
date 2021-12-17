import Axios from 'axios';
import React, { Component } from 'react';
import Swal from 'sweetalert2'
import toast, { Toaster } from 'react-hot-toast';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

class EditEvent extends Component {
    constructor(props) {
        super(props);
        this.state={
            eventname:'',
            startdate:'',
            enddate:'',
            image:'',
            business_address:'',
            telephone:'',
            error_string:'',
            description: '' ,
            id:this.props.match.params.id // You can also pass a Quill Delta here
            
        }
       
    }
    componentDidMount(){
        Axios.post('/api/get_event_by_id',{ id:this.props.match.params.id}).then(res=>{
            console.log(res);
            this.setState({
                description:res.data.description,
                eventname:res.data.event_name,
                startdate:res.data.startdate,
                enddate:res.data.enddate,
                image:res.data.image,
            })
        })
     }
    Description(event) {
        this.setState({
            description: event
        })
    }
    enddate(e){
        this.setState({
            enddate:e.target.value
        })
    }
    Eventname(e){
        this.setState({
            eventname:e.target.value
        })
    }

   
    startdate(e){
        this.setState({
            startdate:e.target.value
        })
    }
    Image(event) {
        if (event.target.files) {
            const files = Array.from(event.target.files);
            const promises = files.map(file => {
                return (new Promise((resolve, reject) => {
                    const reader = new FileReader();
                    reader.addEventListener('load', (ev) => {
                        resolve(ev.target.result);
                    });
                    reader.addEventListener('error', reject);
                    reader.readAsDataURL(file);
                }))
            });
            Promise.all(promises).then(images => {
                this.setState({
                    image: images[0]
                })
            }, error => { console.error(error); });
        }
    }
  
    update_event(){
     
                Axios.post('/api/update_event',this.state).then(res=>{
                        console.log(res);
                        if(res.data.status == 200){
                          toast.success('Events Update SuccessFully');
                          this.props.history.push('/admin/list-events');
                        }else{
                            this.setState({
                                error_string:res.data.message
                            })
                            toast.error('Error - '+res.data.message);
                        }
                })

        
    }
    render() {
        return (
            <div>
                
                <div className="container">
                <div className="top_section_title_div">
                    <h2 className="section_title">Edit Event</h2>
                </div>
                    <div className="card mt-3 p-3">
                        <div className="row col-md-12">
                            <div class="form-group input_div col-md-12">
                                <label className="input_label" for="exampleInputEmail1">Event Name</label>
                                <input onChange={this.Eventname.bind(this)} value={this.state.eventname}  type="Name" class="form-control "  aria-describedby="emailHelp"  />
                            </div>
                            {/* <div class="form-group input_div col-md-">
                                <label className="input_label" for="exampleInputEmail1">Event Image</label>
                                <input onChange={this.Image.bind(this)} type="file"   class="form-control "  aria-describedby="emailHelp" ></input>
                                <img src={this.state.image} style={{width:'100%'}}></img>
                            </div> */}
                           
                        </div>
                        <div className="row col-md-12">
                           
                            <div class="form-group input_div col-md-12">
                                <label className="input_label" for="exampleInputEmail1">Event Image</label>
                                <input onChange={this.Image.bind(this)} type="file"   class="form-control "  aria-describedby="emailHelp" ></input>
                                <img src={this.state.image} style={{width:'50%'}}></img>
                            </div>
                           
                        </div>
                        <div className="row col-md-12">
                        <div class="form-group input_div col-md-12">
                            <label className="input_label" for="exampleInputEmail1">Description</label>
                                     <ReactQuill value={this.state.description} class="form-control " value={this.state.description}  aria-describedby="emailHelp" onChange={this.Description.bind(this)}/>
                        </div></div>
                       
                        <div className="row col-md-12">
                            <div class="form-group input_div col-md-6">
                                <label className="input_label" for="exampleInputEmail1">Start Date</label>
                                <input onChange={this.startdate.bind(this)} type="date" class="form-control " value={this.state.startdate}  aria-describedby="emailHelp"  />
                            </div>
                            <div class="form-group input_div col-md-6">
                                <label className="input_label" for="exampleInputEmail1">End Date</label>
                                <input onChange={this.enddate.bind(this)} type="date"  class="form-control " value={this.state.enddate}  aria-describedby="emailHelp"></input>
                            </div>
                            
                          
                        </div>
                        {
                            this.state.error_string != '' ?
                            <p className="text-center text-danger">{this.state.error_string}</p>
                            : null
                        }
                        <div className="mt-3 ml-3 mb-3">
                            <button onClick={this.update_event.bind(this)} className="btn btn-success">Update</button>
                        </div>
                    </div>
                </div>
               
            </div>
        );
    }
}
export default EditEvent;