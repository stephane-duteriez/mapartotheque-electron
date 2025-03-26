export const pdfHeader = `
\\book {
   \\paper {
      markup-system-spacing.basic-distance = #12
  }
  \\score {
    <<
       \\context Staff
         { \\tune } 
         { \\chords_tune }    
    >> 
    \\layout {}
	\\header {
      opus = $category$
    }
  }
}
`;