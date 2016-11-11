import * as io from 'socket.io-client';
import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {Observable} from 'rxjs/Observable'

@Injectable()
export class SocketService{
    private socketServerUrl = 'http://localhost:3008';
    socket = null;
    socket_data = null;

    data:string = null;

    initialize():void{//初始化socket
        //var socket_data = {a:'aaa'};
        this.socket = io(this.socketServerUrl);
        alert('socket initialized!');
        
        this.socket.on('message', (data)=>{
            alert(data);
            
        })
    }

    // getLog():Observable<any>{
    //     alert('start getting log');
    //     let observable = new Observable(observer => { 
    //             this.socket = io(this.socketServerUrl);
    //             this.socket.on('message', (data) => { 
    //                                 observer.next(data); 
    //                             }
    //                         ); 
    //             this.socket.emit('my other event', 'ssfakhgakhgkah');
    //             return () => { this.socket.disconnect(); }; 
    //         }) 
    //     return observable;
    // }
    getLog():string{
        alert('start getting log');
        this.socket.on('message', (data)=>{
            alert('ppppppppp');
            alert(data);
            this.data = data;
        }); 
        this.socket.emit('my other event', 'ssfakhgakhgkah');

        return this.data;
    }
}