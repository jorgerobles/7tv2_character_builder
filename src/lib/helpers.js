import domtoimage from 'dom-to-image';


export function sendAsFile(filename, data, mimetype) {
    let blob = new Blob([data], {type: mimetype});

    let tempLink = document.createElement('a');
        tempLink.href = window.URL.createObjectURL(blob);
        tempLink.setAttribute('download', filename);
        tempLink.click();
}

export function dataURItoBlob(dataURI) {
    // convert base64 to raw binary data held in a string
    // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
    var byteString = atob(dataURI.split(',')[1]);
  
    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]
  
    // write the bytes of the string to an ArrayBuffer
    var ab = new ArrayBuffer(byteString.length);
  
    // create a view into the buffer
    var ia = new Uint8Array(ab);
  
    // set the bytes of the buffer to the correct values
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
  
    // write the ArrayBuffer to a blob, and you're done
    var blob = new Blob([ab], {type: mimeString});
    return blob;
  
  }

  export function sendAsImage(domId, filename,opts={})
  {
    let node=document.getElementById(domId)
    if (opts.scale){
        let rect=node.getBoundingClientRect();
        opts=Object.assign(opts,{
            style: {
                transform:`scale(${opts.scale})`,
                transformOrigin:"left top",
            },
            width: rect.width*opts.scale,
            height: rect.height*opts.scale
        })
    }

    domtoimage.toPng(node,opts)
        .then(function (dataUrl) {
            var link = document.createElement('a');
                link.download = filename || ("7tv_cast-"+domId+".png");
                link.href = dataUrl;
                link.click();
        }); 
  }

