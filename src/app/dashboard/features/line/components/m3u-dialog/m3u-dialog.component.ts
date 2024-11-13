import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-m3u-dialog',
  templateUrl: './m3u-dialog.component.html',
  styleUrl: './m3u-dialog.component.scss'
})
export class M3UDialogComponent {
  username: string = '';
  password: string = '';
  server: string = "http://r2u.tech:80/";
  defaultDns: string = 'r2u.tech';
  isDownloading: boolean = false;

  selectedFormat: any;

  // playlistUrl: string = '';

  constructor(
      public dialogRef: MatDialogRef<M3UDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: {
          username: string;
          password: string
      },
      private toastr: ToastrService
  ) {
      this.username = data.username;
      // console.log("Username :", this.username);
      this.password = data.password;
      // console.log("Password :", this.password);
  }

  formatUrlWithParams(dns:string, format: any){
    if(!format) return '';
    const params:any = {username: this.username, password: this.password, type: format.type, output: format.output};
    const query = new URLSearchParams(params).toString();
    return `http://${dns}:80/get.php?${query}`;
  }

  // http://r2u.tech:80

  formatUrlWithPathVariables(dns:string, format: any): string{
    if(!format) return '';
    const variables:any = {username: this.username, password: this.password, type: format?.type};
    const params:any = {output: format.output};
    const query = new URLSearchParams(params).toString();
    return `http://${dns}:80/playlist/${variables.username}/${variables.password}/${variables.type}?${query}`;
  }



  get downloadUrl(): string {
    if (!this.selectedFormat) return '';
    switch (this.selectedFormat?.type) {
      case 'm3u_plus':
        return this.formatUrlWithParams(this.defaultDns, this.selectedFormat);
      default:
        return this.formatUrlWithPathVariables(this.defaultDns, this.selectedFormat);
    }
      
    // return `${this.server}get.php?username=${this.username}&password=${this.password}&type=m3u_plus&output=mpegts`;
  }

  copyToClipboard(url: string) {
      this.isDownloading = true; // Démarrer le chargement
      navigator.clipboard.writeText(url).then(() => {
          console.log('Copied to clipboard: ', url);
          this.toastr.success('Copied to clipboard.', 'Succès');
          this.isDownloading = false; // Fin du chargement
      }).catch(err => {
          console.error('Could not copy: ', err);
          this.toastr.error('Could not copy.', 'Erreur');
          this.isDownloading = false; // Fin du chargement
      });
  }

  downloadM3U(url: string) {
      this.isDownloading = true; // Démarrer le chargement
      this.toastr.info('Download in progress...', 'Download');
      fetch(url).then(response => {
          if (!response.ok) {
              throw new Error('Network response was not ok');
          }
          // Get the filename from the Content-Disposition header
          const contentDisposition = response.headers.get('Content-Disposition');
          let filename = `playlist_${this.username}_plus.m3u`; // Default filename
          if (contentDisposition) {
              const matches = /filename[^;=\n]*=((['"]).*?\2|([^;\n]*))/i.exec(contentDisposition);
              if (matches != null && matches[1]) {
                  filename = matches[1].replace(/['"]/g, ''); // Clean up quotes
              }
          }
          return response.blob().then(blob => ({blob, filename})); // Return both the Blob and the filename
      }).then(({blob, filename}) => {
          const link = document.createElement('a');
          const blobUrl = window.URL.createObjectURL(blob); // Create a URL for the Blob
          link.href = blobUrl;
          link.download = filename; // Set the filename from response
          document.body.appendChild(link);
          link.click(); // Programmatically click the link to trigger the download
          link.remove(); // Remove the link from the document
          window.URL.revokeObjectURL(blobUrl); // Clean up the URL.createObjectURL
          this.isDownloading = false; // Fin du chargement
          this.toastr.success('Download completed', 'Succès');
      }).catch(error => {
          console.error('There was a problem with the fetch operation:', error);
          this.isDownloading = false; // Fin du chargement même en cas d'erreur
          this.toastr.error('Download failed', 'Erreur');
      });
  }

  onFormatChange(event: any) {
    // Update the selected format
    this.selectedFormat = this.groupedFormats.flatMap(group => group.options).find(option => option.value === event.value);
  }

  trackByFormat(index: number, format: any): string {
    return format.value; // or use another unique identifier such as 'label'
  }
  

    // Group formats by their respective groups
    get groupedFormats() {
      const grouped: { [key: string]: any[] } = {};
      this.formats.forEach(format => {
        if (!grouped[format.group]) {
          grouped[format.group] = [];
        }
        grouped[format.group].push(format);
      });
      return Object.keys(grouped).map(groupName => ({
        group: groupName,
        options: grouped[groupName]
      }));
    }

  formats = [
    {
      label: 'M3U Standard - HLS',
      type: 'm3u',
      group: 'M3U Standard',
      output: 'hls',
      description: 'M3U Standard - HLS format',
      value: 'm3u?output=hls'
    },
    {
      label: 'M3U Standard - MPEGTS',
      type: 'm3u',
      group: 'M3U Standard',
      output: null,
      description: 'M3U Standard - MPEGTS format',
      value: 'm3u'
    },
    {
      label: 'M3U Standard - RTMP',
      type: 'm3u',
      group: 'M3U Standard',
      output: 'rtmp',
      description: 'M3U Standard - RTMP format',
      value: 'm3u?output=rtmp'
    },
    {
      label: 'M3U Plus - HLS',
      type: 'm3u_plus',
      group: 'M3U Plus',
      output: 'hls',
      description: 'M3U Plus - HLS format',
      value: 'm3u_plus?output=hls'
    },
    {
      label: 'M3U Plus - MPEGTS',
      type: 'm3u_plus',
      group: 'M3U Plus',
      output: null,
      description: 'M3U Plus - MPEGTS format',
      value: 'm3u_plus'
    },
    {
      label: 'M3U Plus - RTMP',
      type: 'm3u_plus',
      group: 'M3U Plus',
      output: 'rtmp',
      description: 'M3U Plus - RTMP format',
      value: 'm3u_plus?output=rtmp'
    },
    {
      label: 'Simple List - HLS',
      type: 'simple',
      group: 'Simple List',
      output: 'hls',
      description: 'Simple List - HLS format',
      value: 'simple?output=hls'
    },
    {
      label: 'Simple List - MPEGTS',
      type: 'simple',
      group: 'Simple List',
      output: null,
      description: 'Simple List - MPEGTS format',
      value: 'simple'
    },
    {
      label: 'Simple List - RTMP',
      type: 'simple',
      group: 'Simple List',
      output: 'rtmp',
      description: 'Simple List - RTMP format',
      value: 'simple?output=rtmp'
    },
    {
      label: 'Ariva - HLS',
      type: 'ariva',
      group: 'Ariva',
      output: 'hls',
      description: 'Ariva - HLS format',
      value: 'ariva?output=hls'
    },
    {
      label: 'Ariva - MPEGTS',
      type: 'ariva',
      group: 'Ariva',
      output: null,
      description: 'Ariva - MPEGTS format',
      value: 'ariva'
    },
    {
      label: 'Ariva - RTMP',
      type: 'ariva',
      group: 'Ariva',
      output: 'rtmp',
      description: 'Ariva - RTMP format',
      value: 'ariva?output=rtmp'
    },
    {
      label: 'DreamBox OE 2.0 - HLS',
      type: 'dreambox',
      group: 'DreamBox OE 2.0',
      output: 'hls',
      description: 'DreamBox OE 2.0 - HLS format',
      value: 'dreambox?output=hls'
    },
    {
      label: 'DreamBox OE 2.0 - MPEGTS',
      type: 'dreambox',
      group: 'DreamBox OE 2.0',
      output: null,
      description: 'DreamBox OE 2.0 - MPEGTS format',
      value: 'dreambox'
    },
    {
      label: 'DreamBox OE 2.0 - RTMP',
      type: 'dreambox',
      group: 'DreamBox OE 2.0',
      output: 'rtmp',
      description: 'DreamBox OE 2.0 - RTMP format',
      value: 'dreambox?output=rtmp'
    },
    {
      label: 'Enigma 2 OE 1.6 - HLS',
      type: 'enigma16',
      group: 'Enigma 2 OE 1.6',
      output: 'hls',
      description: 'Enigma 2 OE 1.6 - HLS format',
      value: 'enigma16?output=hls'
    },
    {
      label: 'Enigma 2 OE 1.6 - MPEGTS',
      type: 'enigma16',
      group: 'Enigma 2 OE 1.6',
      output: null,
      description: 'Enigma 2 OE 1.6 - MPEGTS format',
      value: 'enigma16'
    },
    {
      label: 'Enigma 2 OE 1.6 - RTMP',
      type: 'enigma16',
      group: 'Enigma 2 OE 1.6',
      output: 'rtmp',
      description: 'Enigma 2 OE 1.6 - RTMP format',
      value: 'enigma16?output=rtmp'
    },
    {
      label: 'Enigma 2 OE 1.6 Auto Script - HLS',
      type: 'enigma216_script',
      group: 'Enigma 2 OE 1.6 Auto Script',
      output: 'hls',
      description: 'Enigma 2 OE 1.6 Auto Script - HLS format',
      value: 'enigma216_script?output=hls'
    },
    {
      label: 'Enigma 2 OE 1.6 Auto Script - MPEGTS',
      type: 'enigma216_script',
      group: 'Enigma 2 OE 1.6 Auto Script',
      output: null,
      description: 'Enigma 2 OE 1.6 Auto Script - MPEGTS format',
      value: 'enigma216_script'
    },
    {
      label: 'Enigma 2 OE 1.6 Auto Script - RTMP',
      type: 'enigma216_script',
      group: 'Enigma 2 OE 1.6 Auto Script',
      output: 'rtmp',
      description: 'Enigma 2 OE 1.6 Auto Script - RTMP format',
      value: 'enigma216_script?output=rtmp'
    },
    {
      label: 'Enigma 2 OE 2.0 Auto Script - HLS',
      type: 'enigma22_script',
      group: 'Enigma 2 OE 2.0 Auto Script',
      output: 'hls',
      description: 'Enigma 2 OE 2.0 Auto Script - HLS format',
      value: 'enigma22_script?output=hls'
    },
    {
      label: 'Enigma 2 OE 2.0 Auto Script - MPEGTS',
      type: 'enigma22_script',
      group: 'Enigma 2 OE 2.0 Auto Script',
      output: null,
      description: 'Enigma 2 OE 2.0 Auto Script - MPEGTS format',
      value: 'enigma22_script'
    },
    {
      label: 'Enigma 2 OE 2.0 Auto Script - RTMP',
      type: 'enigma22_script',
      group: 'Enigma 2 OE 2.0 Auto Script',
      output: 'rtmp',
      description: 'Enigma 2 OE 2.0 Auto Script - RTMP format',
      value: 'enigma22_script?output=rtmp'
    },
    {
      label: 'Fortec999/Prifix9400/Starport - HLS',
      type: 'fps',
      group: 'Fortec999/Prifix9400/Starport',
      output: 'hls',
      description: 'Fortec999/Prifix9400/Starport - HLS format',
      value: 'fps?output=hls'
    },
    {
      label: 'Fortec999/Prifix9400/Starport - MPEGTS',
      type: 'fps',
      group: 'Fortec999/Prifix9400/Starport',
      output: null,
      description: 'Fortec999/Prifix9400/Starport - MPEGTS format',
      value: 'fps'
    },
    {
      label: 'Fortec999/Prifix9400/Starport - RTMP',
      type: 'fps',
      group: 'Fortec999/Prifix9400/Starport',
      output: 'rtmp',
      description: 'Fortec999/Prifix9400/Starport - RTMP format',
      value: 'fps?output=rtmp'
    }
  ];
  
  
}
