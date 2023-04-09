import { app } from './app';

function main() {

    const PORT = app.get('PORT'); 
    
    app.listen(PORT, () => {
        console.log(`server run o port ${PORT}🚀`);
    });
 

}
  
main(); 