predictInR = function(rdata3) {

  ##-------------------------------------------------------------------------------------------------------------------
  ## Calculates the pdf of negative binomial distribution
  nb<-function(x){
    (gamma(y+(1/tau)))/((factorial(y))*(gamma(1/tau)))*
      ((1/(1+(tau*(m*exp(x)))))^(1/tau))*
      (((tau*(m*exp(x)))/(1+(tau*(m*exp(x)))))^y)*
      ((1/(((sqrt(2*pi))*sigma))*(exp(-(((x-esteta)^2)/(2*var))))))
  }
  ##-------------------------------------------------------------------------------------------------------------------
  
  
  ## Calculate the pdf of poisson distribution
  poi<-function(x){
    ((exp(-(m*exp(x))))*((m*(exp(x)))^y))*
      (1/factorial(y))*(1/((sqrt(2*pi))*sigma))*(exp((-((x-esteta)^2))/(2*var)))
  }
  
  ##-------------------------------------------------------------------------------------------------------------------
  
  alpha<-0.1
  beta<-(1-(alpha/2))
  Index<-1
  IMth<-15
  ##-------------------------------------------------------------------------------------------------------------------
  
  for (Index in 1:3){
    if (rdata3[Index,1]==IMth)  
    {
      flag<-0
      signal<-0
      distribution<-rdata3$dist[Index]
      month<-rdata3[Index,1]
      tau<-rdata3$Scale[Index]
      m<-rdata3$covariate1[Index]
      predmean<-rdata3$pred[Index]
      
      sigma<-rdata3$stdeta[Index]
      var<-(sigma*sigma)
      esteta<-rdata3$esteta[Index]
      ll<-esteta-(3*sigma)
      ul<-esteta+(3*sigma)
      cdf<-0
      pdf<-0
      cdf2<-cdf
      i<-rdata3$sumattempters[Index]
      
      lcl<-0
      ucl<-0
      j<-0
      k<-j+1
      n<-0
      pdflcl<-0
      uclprev<-0
      cdfuclprev<-0
      cdfucl<-0
      L<-0
      df<-data.frame(month=numeric(0),y=numeric(0),pdf=numeric(0),cdf=numeric(0),pvalue=numeric(0),lcl=numeric(0),ucl=numeric(0),L=numeric(0),R=numeric(0))

      for(y in 0:i){
        
        a<-y
        if (distribution == "Poisson"){
          pdfstr<-integrate(poi,lower=ll,upper=ul)
        }
        if (distribution == "NB"){
          pdfstr<-integrate(nb,lower=ll,upper=ul)
        }
        pdf<-as.numeric(pdfstr[1])
        cdf<-cdf+pdf
        
        if (i >= predmean)
          pvalue<-1-cdf
        else
          pvalue<-cdf
        
        if (y==0 && cdf>beta)
        {
          L<-0
          R<-0
          flag<-7
          signal<-1
        }
        
        ##-----------------------------------------------------------------------------------------------------------------------
        
        ##Set L as 0, if the cdf at y=0 is GT (alpha/2)
        if (flag==0 && y==0 && i>0)
        {
          cdf6<-cdf
          if (cdf6>alpha/2)
          {
            L<-0
            flag<-6
          }
        }
        
        ##Calculate lcl for y=0 when i=0
        if (flag==0 && y==0 && i==0)
        {
          w<-i
          cdf5<-cdf
          while (cdf5<=(alpha/2))
          {
            w<-w+1
            y<-w
            if (distribution == "Poisson"){
              
              pdfstr5<-integrate(poi,lower=ll,upper=ul)
            }
            if (distribution == "NB"){
              
              pdfstr5<-integrate(nb,lower=ll,upper=ul)
            }
            pdf5<-as.numeric(pdfstr5[1])
            cdf5<-cdf5+pdf5
            
          }
          lclprev5<-y-1
          if (lclprev5<0)
          {
            lclprev5<-0
            L<-0
            flag<-5
          }
          else
          {
            cdflclnext5<-cdf5
            cdflclprev5<-0
            y<-0
            for (y in 0:lclprev5)
            {
              if (distribution == "Poisson"){
                pdfstrlclprev5<-integrate(poi,lower=ll,upper=ul)
              }
              if (distribution == "NB"){
                pdfstrlclprev5<-integrate(nb,lower=ll,upper=ul)
              }
              pdflclprev5<-as.numeric(pdfstrlclprev5[1])
              cdflclprev5<-cdflclprev5+pdflclprev5
            }
            
            L<-(lclprev5) + (((alpha/2)-cdflclprev5)/(cdflclnext5-cdflclprev5))
            flag<-5
            y<-i
          }
        }
        
        ## Calculate lcl for y>=1
        if (flag==0 && y>=1 && y<i)
        {
          if (cdf>(alpha/2)){
            ##cdfcheck<-cdf
            lcl<-y-1
            n<-y
            if (lcl<0){
              lcl<-0
            }
            
            ##Code continues for corrected lower prediction interval
            cdfnext<-cdf
            cdflcl<-0
            y<-0
            for (y in 0:lcl)
            {
              if (distribution == "Poisson"){
                pdfstrlcl<-integrate(poi,lower=ll,upper=ul)
              }
              if (distribution == "NB"){
                pdfstrlcl<-integrate(nb,lower=ll,upper=ul)
              }
              pdflcl<-as.numeric(pdfstrlcl[1])
              cdflcl<-cdflcl+pdflcl
            }
            L<-(lcl) + (((alpha/2)-cdflcl)/(cdfnext-cdflcl))
            
            if (L < 0) 
            {
              L<-0
            }
            y<-n
            flag<-2
          }
        }
        
        ##----------------------------------------------------------------------------------------------------------------
        
        if (flag==0 && y==i && i > 0)
        {
          z<-i
          cdf4<-cdf
          while (cdf4<=(alpha/2))
          {
            z<-z+1
            y<-z
            if (distribution == "Poisson"){
              
              pdfstr4<-integrate(poi,lower=ll,upper=ul)
            }
            if (distribution == "NB"){
              
              pdfstr4<-integrate(nb,lower=ll,upper=ul)
            }
            pdf4<-as.numeric(pdfstr4[1])
            cdf4<-cdf4+pdf4
            
          }
          lclprev2<-y-1
          cdflclnext2<-cdf4
          cdflclprev2<-0
          y<-0
          for (y in 0:lclprev2)
          {
            if (distribution == "Poisson"){
              pdfstrlclprev2<-integrate(poi,lower=ll,upper=ul)
            }
            if (distribution == "NB"){
              pdfstrlclprev2<-integrate(nb,lower=ll,upper=ul)
            }
            pdflclprev2<-as.numeric(pdfstrlclprev2[1])
            cdflclprev2<-cdflclprev2+pdflclprev2
          }
          
          L<-(lclprev2) + (((alpha/2)-cdflclprev2)/(cdflclnext2-cdflclprev2))
          flag<-3
          y<-i
        }
        
        ##---------------------------------------------------------------------------------------------------------------
        
        
        
        ##--------------------------------------------------------------------------------------------------------------
        ## Calculate ucl and upper corrected prediction interval limit - First scenario
        if (signal==0 && y>=0 && y < i)
        {
          if (cdf>beta){
            b<-y
            ucl<-y
            signal<-1
            check<-1
            uclprev<-(ucl-1)
            cdfucl<-cdf
            ##q<-y
            cdfuclprev<-0
          }   
          
          y<-0
          for (y in 0:uclprev){
            if (distribution == "Poisson"){
              
              pdfstruclprev<-integrate(poi,lower=ll,upper=ul)
            }
            if (distribution == "NB"){
              
              pdfstruclprev<-integrate(nb,lower=ll,upper=ul)
            }
            pdfuclprev<-as.numeric(pdfstruclprev[1])
            cdfuclprev<-cdfuclprev+pdfuclprev
          }
          R<-(ucl-1) + ((1-(alpha/2))-cdfuclprev)/(cdfucl-cdfuclprev)
          
        }
        ## ucl and Upper prediction interval limit calculation - second scenario 
        if(y==i && signal==0){
          j<-i
          ##y<-j+1
          cdf2<-cdf
          cdf3<-cdf
          while (cdf2<=beta){
            j<-j+1
            y<-j
            if (distribution == "Poisson"){
              
              pdfstr2<-integrate(poi,lower=ll,upper=ul)
            }
            if (distribution == "NB"){
              
              pdfstr2<-integrate(nb,lower=ll,upper=ul)
            }
            pdf2<-as.numeric(pdfstr2[1])
            cdf2<-cdf2+pdf2
            ##j<-j+1
            ##y<-j
          }
          ucl<-y
          signal<-1
          
          check<-0
          uclprev2<-(ucl-1)
          cdfucl2<-cdf2
          cdfuclprev2<-0
          r<-y
          y<-0
          for (y in 0:uclprev2){
            if (distribution == "Poisson"){
              pdfstruclprev2<-integrate(poi,lower=ll,upper=ul)
            }
            if (distribution == "NB"){
              pdfstruclprev2<-integrate(nb,lower=ll,upper=ul)
            }
            pdfuclprev2<-as.numeric(pdfstruclprev2[1])
            cdfuclprev2<-cdfuclprev2+pdfuclprev2
          }
          R<-(ucl-1) + ((1-(alpha/2))-cdfuclprev2)/(cdfucl2-cdfuclprev2)
          
          
        }
        ##y<-a
      }  
      
      df<-rbind(df,c(month,i,pdf,cdf,pvalue,lcl,ucl,L,R))
      ##print(df)
      if ( month==IMth){
        if (Index==1)
          rdata4<-df
        else
          rdata4<-rbind(rdata4,c(month,i,pdf,cdf,pvalue,lcl,ucl,L,R))
      }
      ##y<-y+1
      
      
    } 

    IMth<-IMth+1
  }
  
  colnames(rdata4)<-c("Month_No","y","pdf","cdf","pvalue","lcl","ucl","L","R")
  rdata4<-rdata4[,1:9]
  return(rdata4)
}
