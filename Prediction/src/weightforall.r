delay2 = read.table('C:/Documents and Settings/nlu/Desktop/New survallience data/Rdata1.txt',header=FALSE,fill=TRUE)
temp=rep(0,139*3)
temp[1:3]=1:3
for(i in 1:138)
{
temp[i*3+1]=1+17*i
temp[i*3+2]=2+17*i
temp[i*3+3]=3+17*i
}
d1=delay2[-temp,]
fadata=d1[,-1]


fadist=function(delay,fa)
{
	pro=rep(0,14)
	pro[1]=1
	for (i in 2:14)
	{#pro[i]=pro[i-1]*(sum(delay[1:(i-1),1:(14-i+1)])+0.001)/(sum(delay[1:(i-1),1:(14-i+2)])+0.001)
		pro[i]=pro[i-1]*(1-sum(delay[1:(i-1),(14-i+2)])/(sum(delay[1:(i-1),1:(14-i+2)])+0.001))
		if(pro[i]<0.001) {pro[i]=0.001}
	}
	fac=rep(fa,14)
	time=1:14
	weight=1/pro


	sx=as.data.frame(cbind(weight,time,fac))
	return(sx)
}

temp=fadist(fadata[1:14,],1)
j=1
for (i in 2:139)
{j=j+14
	data=fadata[(j:(j+13)),]
	temp=rbind(temp,fadist(data,i))
}
	
write.table(temp, file = "C:/Documents and Settings/nlu/Desktop/weightforall.csv", sep = ",", col.names = NA,
            qmethod = "double")

