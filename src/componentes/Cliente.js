import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Modal from '@material-ui/core/Modal';
import Icon from '@material-ui/core/Icon';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios';


const config = {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
}

function rand() {
    return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  
    return {
        top: '10%',
        left: '39%',
    };
  }

const styles = theme => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
      width: 200,
    },
    menu: {
      width: 200,
    },
    button: {
        width: '95%',
        margin: theme.spacing.unit,
    },
    buttonadd:{
        width: 61,
        margin: theme.spacing.unit,
        marginRight:-1500
    },
      input: {
        width : '100%',
        display: 'none',
    },
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
      },
      table: {
        minWidth: 700,
      },
      paper: {
        position: 'absolute',
        width: theme.spacing.unit * 50,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        /*padding: theme.spacing.unit * 4,*/
      },
});

let id = 0;
function createData( name, calories, fat, carbs, protein) {
    id += 1;
    return { id, name, calories, fat, carbs, protein };
}

const optionsSelect = [];
const rows = [
      
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
  ];


class Cliente extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            Id:'',
            Rut:'',
            Nombre:'',
            Apellido:'',
            TipoCliente:'',
            Estado:'',
            Producto: '',
            Fecha : '',
            nombrecomponente:'Ingreso Cliente',
            open: false,
            datos: []
        };
        this.handleAllCliente();
    }


    handlePillUpProducto = () =>{
        axios.get('http://localhost:50510/api/Producto/', config)
        .then(function(response){
            console.log(response);
        }).catch(function(error){
           console.log(error);
        });
    }

    handleOpen = () => {
        this.setState({ open: true });
      };
    
      handleClose = () => {
        this.setState({ open: false });
      };

      handleCleanState = () =>{
          this.setState({
            Id:'',
            Rut:'',
            Nombre:'',
            Apellido:'',
            TipoCliente:'',
            Estado:'',
            Producto: '',
            Fecha : ''
          })
      }

    handleAllCliente = () => {
        axios.get('http://localhost:50510/api/Cliente',)
        .then((result) => {
            if(result.status === 200){
                result.data.map(row => {
                   this.setState({datos : result.data});
                })
            }else{
               alert(result.data);
            }
        });
    }

    handleClickCrear = () => {
        if( this.state.Rut !== "" &&
            this.state.Nombre !== "" &&
            this.state.Apellido !== "" &&
            this.state.TipoCliente !== "" &&
            this.state.Estado !== "" && 
            this.state.Producto !== ""){

            axios.post('http://localhost:50510/api/Cliente', {
                'Id': this.state.Id,
                'Rut': this.state.Rut,
                'Nombre': this.state.Nombre,
                'Apellido': this.state.Apellido,
                'TipoCliente': this.state.TipoCliente,
                'Estado': this.state.Estado,
                'Producto':this.state.Producto,
                'Fecha': ''
            }, config)
                .then((result) => {
                    if (result.status === 200){
                            alert("Cliente Ingresado")
                            this.handleCleanState();
                            this.handleAllCliente();
                            //window.location.href = "/app/cliente";    
                    }else{
                        alert(result.data.mensaje);
                    }
            })
            .catch((err) => {
                alert(err);
            })
        }else{
            alert('Debe llenar los campos');
        }
    }

    handleClickLeer = () => {
        if(this.state.Rut !== "")
        {
            axios.get('http://localhost:50510/api/Cliente/'+this.state.Rut+'')
            .then((result) => {
                if(result.status === 200){
                    this.setState({
                        Id:result.data.id,
                        rut: result.data.rut,
                        Nombre: result.data.nombre,
                        Apellido:result.data.apellido,
                        Estado: result.data.estado,
                        Producto:result.data.producto,
                        TipoCliente:result.data.tipocliente
                    })
                }else{
                   alert(result.data);
                }
            });
        }
    }

    handleClickActualizar = () => {
        if( 
        this.state.Id !== '' && 
        this.state.Rut !== '' &&
        this.state.Nombre !== '' &&
        this.state.Apellido !== '' &&
        this.state.TipoCliente !== '' &&
        this.state.Estado !== ''){

        axios.put('http://localhost:50510/api/Cliente', {
            'Id': this.state.id,
            'Rut': this.state.rut,
            'Nombre': this.state.nombre,
            'Apellido': this.state.apellido,
            'TipoCliente': this.state.tipocliente,
            'Estado': this.state.estado,
            'Producto':this.state.producto,
            'Fecha': ''
        }, config)
            .then((result) => {
                if (result.status === 200){
                        alert("Cliente Actualizado");
                        this.handleCleanState();
                        this.handleAllCliente();
                        //window.location.href = "/app/cliente";    
                }else{
                    alert(result.data.mensaje);
                }
        })
        .catch((err) => {
            alert(err);
        })
    }else{
        alert('Debe llenar los campos');
    }
}

    handleClickEliminar = () => {
        if(this.state.Rut !== ''){
    
            axios.delete('http://localhost:50510/api/Cliente/'+this.state.Rut+'', 
            )
                .then((result) => {
                    if (result.status === 200){
                            alert("Cliente Eliminado");
                            this.handleAllCliente();
                            this.handleCleanState();
                    }else{
                        alert(result.data.mensaje);
                    }
            })
            .catch((err) => {
                alert(err);
            })
        }else{
            alert('Debe llenar los campos');
        }
    }

    render () {
        const { classes } = this.props;
        return (
            <div>
                <div>
                    <Button variant="fab" color="primary" aria-label="Add" className={classes.buttonadd} onClick={this.handleOpen}>
                    +
                    </Button>
                </div>
                <center>
                <Paper className={classes.root}>
                    <Table className={classes.table}>
                        <TableHead>
                        <TableRow>
                            <TableCell>RUT</TableCell>
                            <TableCell>Nombre</TableCell>
                            <TableCell>Apellido</TableCell>
                            <TableCell>Estado</TableCell>
                            <TableCell>Producto</TableCell>
                            <TableCell>Fecha Ing.</TableCell>
                            <TableCell>Actividad</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {this.state.datos.map(function(item, key) {
                            return (
                            <TableRow key={item.id}>
                                <TableCell component="th" scope="row">
                                {item.rut}
                                </TableCell>
                                <TableCell>{item.nombre}</TableCell>
                                <TableCell>{item.apellido}</TableCell>
                                <TableCell>{item.estado}</TableCell>
                                <TableCell>{item.producto}</TableCell>
                                <TableCell>{item.fecha}</TableCell>
                                <TableCell> 
                                    <Grid item xs={8}>
                                        <Button color="inherit" className={classes.menuButton}>Eliminar</Button>
                                        <Button color="inherit" className={classes.menuButton}>Editar</Button>
                                    </Grid>
                                </TableCell>
                            </TableRow>
                            );
                        })}
                        </TableBody>
                    </Table>
                    </Paper>
                    <Modal
                        aria-labelledby="simple-modal-title"
                        aria-describedby="simple-modal-description"
                        open={this.state.open}
                        onClose={this.handleClose}
                        >
                        <div style={getModalStyle()} className={classes.paper}>
                        <TextField
                            id="Id"
                            label="id"
                            className={classes.textField}
                            autoComplete="current-password"
                            margin="normal"
                            value={this.state.Id}
                            onChange={e => this.setState({ Id: e.target.value })}
                        />
                        <br/>
                        <TextField
                            id="Rut"
                            label="rut"
                            className={classes.textField}
                            autoComplete="current-password"
                            margin="normal"
                            value={this.state.Rut}
                            onChange={e => this.setState({ Rut: e.target.value })}
                        />
                        <br/>
                        <TextField
                            id="Nombre"
                            label="nombre"
                            className={classes.textField}
                            autoComplete="current-password"
                            margin="normal"
                            value={this.state.Nombre}
                            onChange={e => this.setState({ Nombre: e.target.value })}
                        />
                        <br/>
                        <TextField
                            id="Apellido"
                            label="apellido"
                            className={classes.textField}
                            autoComplete="current-password"
                            margin="normal"
                            value={this.state.Apellido}
                            onChange={e => this.setState({ Apellido: e.target.value })}
                        />
                        <br/>
                        <TextField
                            id="TipoCliente"
                            label="tipocliente"
                            className={classes.textField}
                            autoComplete="current-password"
                            margin="normal"
                            value={this.state.TipoCliente}
                            onChange={e => this.setState({ TipoCliente: e.target.value })}
                        />
                        <br/>
                        <TextField
                            id="Estado"
                            label="estado"
                            className={classes.textField}
                            autoComplete="current-password"
                            margin="normal"
                            value={this.state.Estado}
                            onChange={e => this.setState({ Estado: e.target.value })}
                        />
                        <br/>
                        <TextField
                            id="Producto"
                            label="Producto"
                            className={classes.textField}
                            autoComplete="current-password"
                            margin="normal"
                            value={this.state.Producto}
                            onChange={e => this.setState({ Producto: e.target.value })}
                        />
                        <br/>
                        <Button  
                            variant="contained"
                            color="primary"
                            className={classes.button}
                            onClick={this.handleClickCrear}
                        >
                        Crear
                        </Button >
                        <br/>
                        <Button  
                            variant="contained"
                            color="primary"
                            className={classes.button}
                            onClick={this.handleClickLeer}
                        >
                        Leer
                        </Button >
                        <br/>
                        <Button  
                            variant="contained"
                            color="primary"
                            className={classes.button}
                            onClick={this.handleClickActualizar}
                        >
                        Actualizar
                        </Button >
                        <br/>
                        <Button  
                            variant="contained"
                            color="primary"
                            className={classes.button}
                            onClick={this.handleClickEliminar}
                        >
                        Eliminar
                        </Button >
                        </div>
                    </Modal>
                </center>
            </div>
        );
    }
}

Cliente.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Cliente);