export default class util {

    GetCurrentYear(currentPeriod) {
        var Splits = currentPeriod.split("-");
        var CurrentYear = Splits[0];
        var semester = Splits[1];

        var Year1, Year2;

        if (parseInt(semester) > 1) {
            Year1 = CurrentYear;
            Year2 = CurrentYear.slice(2);
            parseInt(Year2);
            Year2++;
        }
        else {
            Year2 = CurrentYear.slice(2);
            Year1 = parseInt(CurrentYear);
            parseInt(Year1);
            Year1--;
        }
        return (Year1 + "-" + Year2)
    }

    GetAcademicYears(dataPeriods) {
        var periods = dataPeriods;
        var list = [], aux = [];
        periods.forEach(element => {
            var academicYear = this.GetCurrentYear(element.period);
            if ( ! aux.includes(academicYear) ) {
                list.push({academicYear});
                aux.push(academicYear);
            }
        });
        return list;
    }

    GetCurretTimeDate() {
        var date = new Date();
        var currentDate = date.getFullYear() + "-" + (date.getMonth() +1) + "-" + date.getDate();
        var currentTime = date.getHours() + ":" + date.getMinutes();
        var now = currentDate + " " + currentTime;
        return now;
    }

    GetState(state){
        switch(state){
            case 1 : return "Registrado";
            case 2 : return "En revision";
            case 3 : return "Revisada";
            case 4 : return "Aceptada";
            default: return "Estado no identificado."
        }
    }

    GetEvaluation(state){
        switch(state){
            case 1 : return "Favorable";
            case 2 : return "No favorable";
            default: return "Evaluación no identificada."
        }
    }

    GetEstudianteConIdUsuario(state, id){   
        let encontrado = state.find(element => element.user.id === parseInt(id))
        if(encontrado === undefined){
            return null;
        }
        else{
            return encontrado.id;
        }
    }
}