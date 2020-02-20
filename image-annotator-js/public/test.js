import { MarkerArea } from 'markerjs';

const mark = new MarkerArea(document.getElementById('resultImage'));
mark.show((dataUrl) => {
    const res = document.getElementById("resultImage");
    res.src = dataUrl;
});