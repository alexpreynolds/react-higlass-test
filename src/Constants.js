export const windowSizeDebounceTime = 500;

export const appChromosomeTrackHeight = 30;
export const appGeneAnnotationTrackHeight = 100;

export const appDataSourceURLPrefixes = {
  "AmazonCDN": "https://d1y3bo4esmnv83.cloudfront.net",
  "Altius":    "https://resources.altius.org/~areynolds/public/fiberview/072823",
};
export const appDefaultDataSourceURLPrefixKey = "AmazonCDN";
export const appAltiusDataSourceURLPrefixKey =  "Altius";

export const hg38FastaURL = `${appDataSourceURLPrefixes['AmazonCDN']}/hg38.meuleman.fixedBin.chrom.sizes.60.fa`;
export const hg38FastaIndexURL = `${appDataSourceURLPrefixes['AmazonCDN']}/hg38.meuleman.fixedBin.chrom.sizes.60.fa.fai`;
export const hg38ChromsizesURL = `${appDataSourceURLPrefixes['AmazonCDN']}/hg38.meuleman.fixedBin.chrom.sizes`;
export const hg38UnadjustedChromsizesURL = `${appDataSourceURLPrefixes['AmazonCDN']}/hg38-fsv-bw.chrom.sizes`;

export const appSequenceTrackHeight = 14;
export const appSequenceTrackColormap = [
  "#007FFF", // color of A
  "#e8e500", // color of T
  "#008000", // color of G
  "#FF0038", // color of C
  "#800080", // color of N
  "#DCDCDC", // color of everything else
];

export const baseHg38Viewconf = {
    "editable": true,
    "zoomFixed" : false,
    "trackSourceServers": [
      "/api/v1",
      "http://higlass.io/api/v1"
    ],
    "exportViewUrl": "/api/v1/viewconfs",
    "views": [
      {
        "uid" : "cd3PosD2GimelbrantTrackHubTestCombined",
        "initialXDomain": [
          2670804998.0062256,
          2670805811.9694824
        ],
        "genomePositionSearchBoxVisible" : false,
        "genomePositionSearchBox" : {},
        "tracks": {
          "top": [
            {
              "name" : "chromosomes_hg38",
              "created" : "2019-04-11T15:11:47.798450Z",
              "project" : "bLwQYp24jRG2YyAxGaGGwMg",
              "project_name" : "",
              "description" : "",
              "chromInfoPath" : `${appDataSourceURLPrefixes['AmazonCDN']}/hg38.meuleman.fixedBin.chrom.sizes`,
              "uid" : "4fd8b376-f112-4839-a5e1-cb8b4d4907-a",
              "type" : "horizontal-chromosome-labels",
              "options" : {
                "name" : "genomic coordinates",
                "color" : "#777777",
                "stroke" : "#FFFFFF",
                "fontSize" : 12,
                "fontIsAligned" : false,
                "showMousePosition" : true,
                "mousePositionColor" : "#999999",
                "backgroundColor" : "white"
              },
              "height" : 30,
              "position" : "top",
            },
            {
              "uid": "seq_fasta_hg38",
              "type": "horizontal-sequence",
              "name": "Sequence (hg38)",
              "data": {
                "type": "fasta",
                "fastaUrl": hg38FastaURL,
                "faiUrl": hg38FastaIndexURL,
                "chromSizesUrl": hg38ChromsizesURL
              },
              "options": {
                "name" : "genomic sequence",
                "labelPosition": "hidden",
                "fontSize": 10,
                "fontFamily": "Helvetica",
                "fontColor": "white",
                "colorScale": appSequenceTrackColormap,
              },
              "height": 14,
              "position": "top",
            },
            // {
            //   "name": "Gencode v38",
            //   "type": "horizontal-transcripts",
            //   "uid": "gencode.v38.annotation",
            //   "options": {
            //     "name" : "gene transcripts",
            //     "blockStyle": "directional",
            //     "maxRows": 6,
            //     "maxTexts": 50,
            //     "labelFontSize": 8,
            //     "labelFontWeight": 500,
            //     "transcriptHeight": 12,
            //     "transcriptSpacing": 2,
            //     "showMousePosition": true,
            //     "startCollapsed": false,
            //     "showToggleTranscriptsButton": false,
            //     "utrColor": "grey",
            //     "plusStrandColor": "#111111",
            //     "minusStrandColor": "#111111",
            //     "trackMargin": {top:10, bottom:10, left:0, right:0},
            //     "blockCalculateTranscriptCounts": true,
            //     "highlightTranscriptType": "longestIsoform",
            //     "highlightTranscriptTrackBackgroundColor": "#fdcfcf",
            //   },
            //   "height" : appGeneAnnotationTrackHeight,
            //   "data" : {
            //     "type": "tabix",
            //     "url": `${appDataSourceURLPrefixes['AmazonCDN']}/tabix/gencode.v38.annotation.gtf.higlass-transcripts.hgnc.090721.forceHGNC.gz`,
            //     "chromSizesUrl": hg38ChromsizesURL,
            //   },
            // },
            {
              "type": "pileup",
              "options": {
                "axisPositionHorizontal": "right",
                "axisLabelFormatting": "normal",
                "showCoverage": false,
                "colorScale": [
                  // A T G C N Other
                  "#2c7bb6",
                  "#92c5de",
                  "#ffffbf",
                  "#fdae61",
                  "#808080",
                  "#DCDCDC"
                ]
              },
              "height": 300,
              "uid": "FylkvVBTSumoJ959HT4-5A",
              "data": {
                "type": "bam",
                "bamUrl": `${appDataSourceURLPrefixes['AmazonCDN']}/test/GRCh38.illumina.brain.1.chr.bam`,
                "baiUrl": `${appDataSourceURLPrefixes['AmazonCDN']}/test/GRCh38.illumina.brain.1.chr.bam.bai`,
                "chromSizesUrl": hg38ChromsizesURL,
                "options": {
                  "maxTileWidth": 30000,
                }
              },
            }
          ]
        },
        "layout": {
          "w": 12,
          "h": 12,
          "x": 0,
          "y": 0,
        }
      }
    ],
    "valueScaleLocks": {
      "locksByViewUid": {},
      "locksDict": {}
    },
  }