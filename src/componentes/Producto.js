import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Modal from '@material-ui/core/Modal';
import Grid from '@material-ui/core/Grid';
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

function getModalStyle() {
  
    return {
        top: '10%',
        left: '39%',
    };
  }

class Producto extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            codeproduct: '',
            nombreproducto: '',
            tipoproducto:'',
            saldominimo: '',
            estado: '',
            datos:[]

        };
        this.handleClickVerProducto();
    }

    handleOpen = () => {
        this.setState({ open: true });
      };
    
      handleClose = () => {
        this.setState({ open: false });
      };


    handleCleanState = () =>{
        this.setState({
            id: '',
            codeproduct: '',
            nombreproducto: '',
            tipoproducto:'',
            saldominimo: '',
            estado: '', 
        })
    }
    handleClickCrearProducto = () => {
        if(this.state.id !== '' && this.state.codeproduct !== '' && this.state.nombreproducto !== '' && this.state.tipoproducto !== '' && this.state.saldominimo !== '' && this.state.estado !== ''){
         axios.post("http://localhost:50510/api/Producto", {
                    'id': this.state.id,
                    'codeproduct':this.state.codeproduct,
                    'nombreproducto':this.state.nombreproducto,
                    'tipoproducto':this.state.tipoproducto,
                    'saldominimo':this.state.saldominimo,
                    'estado':this.state.estado
            },).then((result) => {
                if(result.status === 200){
                    alert("Producto Creado");
                    this.handleCleanState();
                    this.handleClickVerProducto();
                }else{
                    alert(result);
                }
            })
            .catch((err) => {
                alert(err);
            })
        }else{
            alert("Todos los campos son requeridos");
        }
    };

    handleClickLeerProducto = () => {
        if(this.state.codeproduct !== '')
        {
            axios.get('http://localhost:50510/api/Producto/'+this.state.codeproduct+'')
            .then((result) => {
                if(result.status === 200){
                    this.setState({
                        id:result.data.id,
                        codeproduct: result.data.codeProduct,
                        nombreproducto: result.data.nombreProducto,
                        tipoproducto:result.data.tipoProducto,
                        estado: result.data.estado,
                        saldominimo:result.data.saldoMinimo
                    })
                }else{
                   alert(result.data);
                }
            });
        }
    }


    handleClickVerProducto = () => {
        axios.get("http://localhost:50510/api/Producto",)
        .then((result) => {
            if(result.status === 200){
                if(result.data.length > 1){
                    result.data.map(row => {
                        this.setState({datos : result.data});
                     })
                }else{
                    
                    this.setState({
                        datos: result.data 
                    })
                    
                }
                
            }
            else{
                    alert(result);
                }
            })
            .catch((err) => {
                alert(err);
            })
    }

    handleClickEliminarProducto = () => {
        if(this.state.codeproduct !== ''){
    
            axios.delete('http://localhost:50510/api/Producto/'+this.state.codeproduct+'', 
            )
                .then((result) => {
                    if (result.status === 200){
                            alert("Producto Eliminado");
                            this.handleClickVerProducto();
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

    handleClickActualizarProducto = () => {
        if( 
        this.state.id !== '' && 
        this.state.codeproduct !== '' &&
        this.state.nombreproducto !== '' &&
        this.state.tipoproducto !== '' &&
        this.state.saldominimo !== '' &&
        this.state.estado !== ''){

        axios.put('http://localhost:50510/api/Producto', {
            'id': this.state.id,
            'codeproduct':this.state.codeproduct,
            'nombreproducto':this.state.nombreproducto,
            'tipoproducto':this.state.tipoproducto,
            'saldominimo':this.state.saldominimo,
            'estado':this.state.estado
        },)
            .then((result) => {
                if (result.status === 200){
                        alert("Cliente Actualizado");
                        this.handleCleanState();
                        this.handleClickVerProducto();
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
                            <TableCell>Código</TableCell>
                            <TableCell>Nombre</TableCell>
                            <TableCell>Tipo Producto</TableCell>
                            <TableCell>Saldo Minimo</TableCell>
                            <TableCell>Estado</TableCell>
                            <TableCell>Actividad</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {this.state.datos.map(function(row, key) {
                            return (
                            <TableRow key={row.id}>
                                <TableCell>{row.codeProduct}</TableCell>
                                <TableCell >{row.nombreProducto}</TableCell>
                                <TableCell >{row.tipoProducto}</TableCell>
                                <TableCell >{row.saldoMinimo}</TableCell>
                                <TableCell>{row.estado}</TableCell>
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
                            id="id"
                            label="id"
                            className={classes.textField}
                            autoComplete="current-password"
                            margin="normal"
                            value={this.state.Id}
                            onChange={e => this.setState({ id: e.target.value })}
                        />
                        <br/>
                        <TextField
                            id="codeproduct"
                            label="Código producto"
                            className={classes.textField}
                            autoComplete="current-password"
                            margin="normal"
                            value={this.state.codeproduct}
                            onChange={e => this.setState({ codeproduct: e.target.value })}
                        />
                        <br/>
                        <TextField
                            id="nombreproducto"
                            label="Nombre Producto"
                            className={classes.textField}
                            autoComplete="current-password"
                            margin="normal"
                            value={this.state.nombreproducto}
                            onChange={e => this.setState({ nombreproducto: e.target.value })}
                        />
                        <br/>
                        <TextField
                            id="tipoproducto"
                            label="Tipo producto"
                            className={classes.textField}
                            autoComplete="current-password"
                            margin="normal"
                            value={this.state.tipoproducto}
                            onChange={e => this.setState({ tipoproducto: e.target.value })}
                        />
                        <br/>
                        <TextField
                            id="saldominimo"
                            label="Saldo Minimo"
                            className={classes.textField}
                            autoComplete="current-password"
                            margin="normal"
                            value={this.state.saldominimo}
                            onChange={e => this.setState({ saldominimo: e.target.value })}
                        />
                        <br/>
                        <TextField
                            id="estado"
                            label="estado"
                            className={classes.textField}
                            autoComplete="current-password"
                            margin="normal"
                            value={this.state.Estado}
                            onChange={e => this.setState({ estado: e.target.value })}
                        />
                        <br/>
                        <Button  
                            variant="contained"
                            color="primary"
                            className={classes.button}
                            onClick={this.handleClickCrearProducto}
                        >
                        Crear
                        </Button >
                        <br/>
                        <Button  
                            variant="contained"
                            color="primary"
                            className={classes.button}
                            onClick={this.handleClickLeerProducto}
                        >
                        Leer
                        </Button >
                        <br/>
                        <Button  
                            variant="contained"
                            color="primary"
                            className={classes.button}
                            onClick={this.handleClickActualizarProducto}
                        >
                        Actualizar
                        </Button >
                        <br/>
                        <Button  
                            variant="contained"
                            color="primary"
                            className={classes.button}
                            onClick={this.handleClickEliminarProducto}
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

Producto.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(Producto);