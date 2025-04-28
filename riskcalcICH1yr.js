/*risk calculation all cause mortality 1 year post SAH*/
function numberFormat(val, decimalPlaces) {

    var multiplier = Math.pow(10, decimalPlaces);
    return (Math.round(val * multiplier) / multiplier).toFixed(decimalPlaces);
}

function calc_risk() {
                //declare a totscore variable
               var totScore;
                //declare variables to hold the rest
                var age,ageCat,ageWeight, sex, sex_t,race, race_t, raceWeight,dementia, dementiaWeight,
                    statin, statinWeight, systolic, systolicWeight,diastolic, diastolicWeight,
                    totChlWeight,priorKid,priorKidWeight,priorHF,priorHFWeight,BMI,BMIWeight,
                    ethnicity_t,ethnicityWeight,creatinine,creatWeight,hospLength,hospLengthWeight, marker;
               const risk = [0,0,0,0];
                age = parseInt($("#txtAge").val());
                // break out age by categories to compute weight
                if (age >=18 && age <= 44)
                {
                    ageCat = 1;
                    ageWeight =  -1.0752;
                }
                else if (age <= 54)
                {
                    ageCat = 2;
                    ageWeight =  -0.26007;
                }
                else if (age <= 64)
                {
                    ageCat = 3;
                    ageWeight = 0;
                }
                else if (age <=74)
                {
                    ageCat = 4;
                    ageWeight =  0.21544;
                }
                else if (age >= 75)
                {
                    ageWeight = 0.38264;
                    ageCat = 5;
                }
                //next sex
                sex_t=$("input[name = 'Sex']:checked").val();
                //race
                race_t = $("input[name = 'Race']:checked").val();
                if (race_t === 'White')
                    raceWeight = 0;
                else if (race_t === 'Black')
                    raceWeight = -0.19524;
                else
                    raceWeight = 0.21474;
                // ethnicity
                ethnicity_t = $("input[name='Ethnicity']:checked").val();
                if (ethnicity_t === "nhisp")
                    ethnicityWeight = 0;
                else
                    ethnicityWeight = -0.23767;
                //length of hospitilization
                hospLength = parseInt($("#txtHosp").val());
                //determine weights based on cat
                if (hospLength <=4)
                    hospLengthWeight = 0;
                else if (hospLength <=9)
                    hospLengthWeight = 0.03457;
                else if (hospLength <=29)
                    hospLengthWeight = 0.31068;
                else if (hospLength <=89)
                    hospLengthWeight = -0.0659;
                else
                    hospLengthWeight = 0.08114;
                //dementia
                if ($("input[name = 'Dementia']:checked").val() === "Yes")
                    dementia = 1;
                else
                    dementia = 0;
                dementiaWeight = dementia * 0.15808;
                //statin
                if ($("input[name = 'Statin']:checked").val() === "No")
                    statinWeight = 0;
                else
                    statinWeight = -0.16943;
                //prior chronic kidney disease
                if ($("input[name = 'priorKid']:checked").val() == "No")
                    priorKidWeight = 0;
                else
                    priorKidWeight= 0.25281;
                //prior heart failure
                if ($("input[name = 'priorHF']:checked").val() == "No")
                    priorHFWeight = 0;
                else
                    priorHFWeight= 0.15121;
                //blood pressure/labs
                if ($("#BP_Sys").val() ==="")
                    {
                        marker = sex_t.trim().toLowerCase()+race_t.trim().toLowerCase()+ageCat;
                        console.log(marker);
                        bpSys = avgLabs[marker].measure[measureEnum.AVGSYS];
                    }
                    else
                    {           
                        bpSys = parseFloat($("#BP_Sys").val());
                    }
                    //compute weights for bpsys;
                    if (bpSys < 120)
                        bpSysWeight = 0.11089;
                    else if (bpSys <=129)
                        bpSysWeight = 0.0502;
                    else if (bpSys <= 139)
                        bpSysWeight = 0;
                    else 
                        bpSysWeight = -0.35915;
    
                    //diastolic
                    if ($("#BP_Dia").val() ==="" )
                        {
                            marker = sex_t.trim().toLowerCase()+race_t.trim().toLowerCase()+ageCat;
                            console.log(marker);
                            bpDia = avgLabs[marker].measure[measureEnum.AVGDIA];
                        }
                        else
                        {           
                            bpDia = parseFloat($("#BP_Dia").val());
                        }
                        //compute weights for bpdia;
                    if (bpDia < 80)
                        bpDiaWeight = 0;
                    else if (bpDia <=89)
                        bpDiaWeight = -0.13232;
                    else 
                        bpDiaWeight = -0.62658;
                // total chol
                //if missing then find average based on sex, race, agegroup
                if ($("#TotChol").val() ==="" )
                {
                    marker = sex_t.trim().toLowerCase()+race_t.trim().toLowerCase()+ageCat;
                    console.log(marker);
                    totchl = avgLabs[marker].measure[measureEnum.AVGCHOL];
                    console.log(totchl);
                }
                else
                {
                    totchl = parseFloat($("#TotChol").val());
                    console.log("WHAT");
                    console.log(parseFloat($("#TotChol").val()));
                }
                if (totchl  < 200 && totchl != 0)
                {
                    totchlWeight = 0;
                }
                else if (totchl >= 200 && totchl <= 239)
                {
                    totchlWeight = -0.22091;
                }
                else if (totchl > 240)
                {
                    totchlWeight = 0.10804;
                }
                else
                {
                    totchlWeight = 0;
                }             
                // bmi
                if ($("#BMI").val() ===""  )
                    {
                        marker = sex_t.trim().toLowerCase()+race_t.trim().toLowerCase()+ageCat;
                        console.log(marker);
                        BMI = avgLabs[marker].measure[measureEnum.AVGBMI];
                    }
                    else
                    {           
                        BMI = parseFloat($("#BMI").val());
                    }
                    //compute weights for BMI;
                if (BMI < 18.5)
                   BMIWeight = 0.73851;
                else if (BMI <=24.9)
                    BMIWeight = 0.23001;
                else if (BMI <=29.9)
                    BMIWeight = 0;
                else if (BMI <=34.9)
                    BMIWeight = -0.03544;
                else if (BMI <=39.9)
                    BMIWeight = -0.25452;
                else
                    BMIWeight = -0.08865;
                // creatine
                if ($("#creat").val()  === '')
                {
                    marker = sex_t.trim().toLowerCase()+race_t.trim().toLowerCase()+ageCat;
                    creatinine = avgLabs[marker].measure[measureEnum.AVGCREAT];
                }
                else
                    creatinine = parseFloat($("#creat").val());
                if (creatinine < 0.74)
                    creatWeight = 0.23172;
                else if (creatinine <= 1.35)
                    creatWeight = 0;
                else
                    creatWeight = 0.24695;

                xbeta = ageWeight +  raceWeight + ethnicityWeight + hospLengthWeight +
                        dementiaWeight + statinWeight+priorKidWeight+priorHFWeight+bpSysWeight
                        +bpDiaWeight+totchlWeight+creatWeight+BMIWeight;
                console.log(creatWeight);
                console.log(ageWeight);
                //eXbeta = Math.exp(xbeta-2.93853);
                eXbeta = Math.exp(xbeta);
                //calculate risk and put in array
                console.log(xbeta);
                console.log(eXbeta);
                //risk = 1 - Math.pow(0.98731,eXbeta);
                risk[0] = numberFormat(Math.pow(0.893293,eXbeta)*100,2);
                risk[1] = numberFormat(Math.pow(0.8284892,eXbeta)*100,2);
                risk[2] = numberFormat(Math.pow(0.7870498,eXbeta)*100,2);
                risk[3] = numberFormat(Math.pow(0.7336207,eXbeta)*100,2);
                return risk;
                }   