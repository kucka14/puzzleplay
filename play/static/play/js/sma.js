
function isLetter(str) {
    if (str.length === 1 && str.match(/[a-zA-Z]/i)) {
        return true;
    } else {
        return false;
    }
}

function countSub(fullString, subString) {
    const re = new RegExp(subString, 'g');
    const stringCount = (fullString.match(re) || []).length;
    return stringCount;
}

const profiles = JSON.parse(document.getElementById('profiles').textContent);
const targetDiv = document.querySelector('#profile-container');

document.querySelector('#equation-submit').onclick = function() {

    let equation = document.querySelector('#equation-input').value;
    let newVariable = document.querySelector('#variable-1').value;
    const newString = document.querySelector('#string-1').value;
    newVariable = newVariable.replace(' ', '');
    
    let variableValid = 0;
    if (newVariable == '') {
        if (newString != '') {
            variableValid = -1;
        }
    } else {
        if (isLetter(newVariable)) {
            if ((newString == '') || ('lxypa'.includes(newVariable))) {
                variableValid = -1;
            } else {
                variableValid = 1;
            }
        } else {
            variableValid = -1;
        }
    }
    
    let willAlert = false;
    let sortedProfiles = []
    for (i = 0; i < profiles.length; i++) {
    
        const profile = profiles[i];
        let postEquation = equation;
        
        postEquation = postEquation.replace(' ', '');
        postEquation = postEquation.replace(/[0-9][a-zA-Z]/g, function(match) {
            return match[0] + '*' + match[1];
        });
        postEquation = postEquation.replace(/[a-zA-Z0-9)]\(/g, function(match) {
            return match[0] + '*' + match[1];
        });
        postEquation = postEquation.replace(/\)[a-zA-Z0-9(]/g, function(match) {
            return match[0] + '*' + match[1];
        });
        
        let stringCount = false;
        if (variableValid == 1) {
            stringCount = countSub(profile.description, newString);
        }
        
        postEquation = postEquation.replace('l', profile.description.length);
        postEquation = postEquation.replace('x', profile.followers);
        postEquation = postEquation.replace('y', profile.following);
        postEquation = postEquation.replace('p', profile.posts);
        postEquation = postEquation.replace('a', profile.age);
        if (variableValid == 1) {
            postEquation = postEquation.replace(newVariable, stringCount);
        }
        
        try {
            score = eval(postEquation);
            if (isNaN(score)) {
                willAlert = true;
                score = 'Unknown';
            } else {
                score = Math.round(score * 100) / 100;
            }
        }
        catch(err) {
            willAlert = true;
            score = 'Unknown';
        }
        
        profileCouplet = [score, profile];
        sortedProfiles.push(profileCouplet);
    }
    
    if (variableValid == -1) {
        alert('Error: Something was wrong with the variable you added.'); 
    }
    
    if (willAlert) {
        alert('Error: Expression could not be evaluated for all profiles.');
    }
    
    sortedProfiles.sort(function(x,y){return x[0] - y[0];});
    sortedProfiles = sortedProfiles.reverse();
    
    targetDiv.innerHTML = '';
    
    for (i = 0; i < sortedProfiles.length; i++) {
    
        const score = sortedProfiles[i][0];
        const profile = sortedProfiles[i][1];
        let ranking = i + 1;
        if (score == 'Unknown') {
            ranking = 'Unknown';
        }
        
        const profileBox = document.createElement('div');
        profileBox.class = 'profile-box';
        profileBox.innerHTML = `
            <div class="profile-box">
                <div class="profile-top">
                    Score: ${score} | Ranking: ${ranking}
                </div>
                <div class="profile-a profile-inner">
                    <img src="${profile.banner}" width="100%">
                </div>
                <div class="profile-b profile-inner">
                    <div class="profile-b-left">
                        <img src="${profile.picture}" width="100%">
                    </div>
                    <div class="profile-b-right">
                        <div>
                            ${profile.username}
                            <br>
                            ${profile.display_name}
                        </div>
                    </div>
                </div>
                <div class="profile-c profile-inner">
                    ${profile.description}
                </div>
                <div class="profile-d profile-inner">
                    <div>
                        ${profile.followers} Followers
                    </div>
                    <div>
                        ${profile.following} Following
                    </div>
                    <div>
                        ${profile.posts} Posts
                    </div>
                </div>
                <div class="profile-e profile-inner">
                    Profile created ${profile.age} days ago.
                </div>
            </div>
            `
            
        targetDiv.appendChild(profileBox);
    }
}

let refreshWarning = true;

document.querySelector('#reset-button').onclick = function() {
    refreshWarning = false;
    window.location.href = '/algorithms/';
}

window.onbeforeunload = function() {
    if (refreshWarning) {
        return '';
    }
}
    
targetDiv.innerHTML = '';
for (i = 0; i < 20; i++) {
    const profileBox = document.createElement('div');
    profileBox.classList.add('profile-box-blank');
    profileBox.innerHTML = '?'
    targetDiv.appendChild(profileBox);
}
    
    
    
    
