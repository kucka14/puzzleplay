const profiles = JSON.parse(document.getElementById('profiles').textContent);


document.querySelector('#equation-submit').onclick = function() {

    let equation = document.querySelector('#equation-input').value;
    
    sortedProfiles = []
    for (i = 0; i < profiles.length; i++) {
    
        const profile = profiles[i];
        
        equation = equation.replace('l', profile.description.length)
        equation = equation.replace('x', profile.followers)
        equation = equation.replace('y', profile.following)
        equation = equation.replace('p', profile.posts)
        equation = equation.replace('a', profile.age)
        
        const score = eval(equation);
        
        profileCouplet = [score, profile];
    }
    
    sorted(sortedProfiles, key=lambda x: x[0]);
    console.log(sortedProfiles);
    
    for (i = 0; i < sortedProfiles.length; i++) {
        
        const profileBox = document.createElement('div');
        profileBox.class = "profile-box";
        profileBox.innerHTML = `
            <div class="profile-box">
                <div class="profile-top">
                    Score: ${score} | Ranking: ${i + 1}
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
            
        
            
        const targetDiv = document.querySelector('#profile-container');
        targetDiv.appendChild(profileBox);
    }
}
    
    
    
    
    
