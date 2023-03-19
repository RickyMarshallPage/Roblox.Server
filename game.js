var Express = require('express');
var FileSystem = require('fs');
var Crypto = require('crypto');

var StandardAssets = {};
var Sign = (_) => {
    // Code provided by Yakov.
    const Signature = Crypto.createSign('sha1');
    Signature.write("\r\n" + _);
    Signature.end();

    const Key = FileSystem.readFileSync("key/PrivateKey.pem"); // Change the directory if needed.
    return `--rbxsig%${Signature.sign(Key, 'base64')}%${"\r\n" + _}`;
}
var Users = {
    ["Roblox"]: {
        UserId: 1, 
        CharacterAppearnce: "",
        MembershipType: "None"
    }
}
var GenerateGuestUserId = () => {
    var _ = 0;
    var OK = false;
    while (!OK) {
        _ = Math.floor(Math.random() * 100000 + 1000);
        OK = Object.values(Users).filter((User) => {User.UserId == _}).length <= 0
    }
    return _;
}
var Routes = {
    ['/game/validate-machine']: {},
    ['/universes/validate-place-join']: 'true',
    ['/avatar']: '',
    ['/game/report-stats']: '',
    ['//uploadmedia/postimage.ashx']: 'Ohayo',
    ['/game/join.ashx']: async(req, res) => {
        console.log('Sending joinscript.')
        // This is incredibly insecure. We should do an authentication system soon.
        var User = (Users[req.query.username]) || {
            UserId: GenerateGuestUserId(),
            CharacterAppearance: "",
            MembershipType: "None"
        }
        var Username = req.query.username || "Guest"
        var JoinScript = {
            CharacterAppearance: "https://avatar.roblox.com/v1/avatar?id="+18181818,
            ClientPort: 0,
            MachineAddress: "127.0.0.1",
            ServerPort: 53640,
            UserName: Username,
            UserId: User.UserId,
            CharacterAppearanceId: User.UserId,
            GameId: "00000000-0000-0000-0000-000000000000",
            PlaceId: 1818,
            ChatStyle: "ClassicAndBubble",
            IsRobloxPlace: true,
            SessionId: "123",
            IsUnknownOrUnder13: false,
            GenerateTeleportJoin: true,
            MembershipType: User.MembershipType || "None",
            CreatorId: 1,
            CreatorTypeEnum: "User",
            AccountAge: 99999999,
            UniverseId: 1818,
            BaseUrl: "http://www.testicles.com"
        }
        res.send(Sign(JSON.stringify(JoinScript)));
    },
    ['/game/placelauncher.ashx']: async(req, res) => {
        res.send({
            jobId: "00000000-0000-0000-0000-000000000000",
            joinScriptUrl: "http://www.testicles.com/game/join.ashx?placeId=1818&username="+req.query.username,
            authenticationUrl: "",
            authenticationTicket: "",
            status: 2
        });
    },
    ['/setting/quietget/clientsharedsettings']: {},
    ['/setting/quietget/clientsettings']: {
        "FFlagRibbonBarEnabled": "True",
        "DFFlagUseKeyframeHumanoidAnimations": "True",
        "CFFlagUseR15Character": "True", //isR15Character
        "FFlagSecureJoinScripts": "False",
        "FFlagFixFirstPersonToolLag": "True",
        "FFlagFixUphillClimb": "True",
        "FFlagNoRunSteepSlope": "True",
        "FFlagNativeChatRendering": "True",
        "FFlagNativeSafeChatRendering": "True",
        "FFlagUserHttpAPIVisible": "True",
        "FFlagModuleScriptsVisible": "True",
        "FFlagSurfaceGuiVisible": "True",
        "FFlagStudioShowToolboxByDefault": "False",
        "FFlagDE4508Fixed": "True",
        "FFlagDE4640Fixed": "True",
        "FFlagDE4793Fixed": "True",
        "FFlagDE6959Fixed": "True",
        "FFlagStudioDE6194FixEnabled": "True",
        "FFlagBetterGuiObjectInsertDefaults": "True",
        "FFlagStudioZoomExtentsExplorerFixEnabled": "True",
        "FFlagExponentialBackoffForFetchingJoinScript": "True",
        "FFlagFixStopButtonStayingOnScreen": "False",
        "FFlagRenderNewMaterials": "True",
        "FFlagRenderAnisotropy": "True",
        "FFlagRenderDisableIgnoreMaterialsAndStuds": "True",
        "FFlagRenderTextureCompositorUse32Bit": "False",
        "FFlagFRMUse60FPSLockstepTable": "False",
        "FFlagFRMAdjustForMultiCore": "True",
        "FFlagFRMRecomputeDistanceFrameDelay": "True",
        "FFlagFRMDisableSSAO": "False",
        "FFlagFRMFogEnabled": "False",
        "FFlagSSAOEnable": "True",
        "FFlagSSAOForce": "False",
        "FFlagCreatePlaceEnabled": "True",
        "DFFlagPartsStreamingEnabled": "True",
        "DFFlagUseProtocolCompatibilityCheck": "False",
        "DFFlagNetworkFilterIllegalScripts": "True",
        "SFFlagAllowPhysicsPacketCompression": "True",
        "DFFlagAllowHeavyCompression": "True",
        "DFFlagProtocolSynchronization": "True",
        "DFFlagUseRenderingDistanceAsStreamingRadiusCap": "True",
        "FFlagSettingsHackProtectionEnabled": "True",
        "FFlagNewStudioEditCamera": "True",
        "FFlagCheckNetworkSecurityKey": "False",
        "FFlagCheckNetworkProtocolVersion": "False",
        "DFFlagDebugDisableTimeoutDisconnect": "False",
        "FFlagImmediateCrashUploadEnabled": "True",
        "FFlagDebugHumanoidRendering": "False",
        "FFlagDebugLocalRccServerConnection": "False",
        "FFlagDebugRenderForcePlayMode": "False",
        "FFlagDebugCrashEnabled": "False",
        "FFlagDebugDisplayFPS": "True",
        "FFlagLuaExceptionSignalEnabled": "True",
        "FFlagModuleScriptsEnabled": "True",
        "FFlagLuaDebugger": "True",
        "FFlagStudioLuaDebugger": "True",
        "FFlagOnScreenProfiler": "False",
        "FFlagInGamePurchases": "True",
        "FFlagFreeFallOptimization": "True",
        "FFlagFixDownhillFreefall": "True",
        "FFlagServerScriptProtection": "True",
        "FFlagStudioPluginUIActionEnabled": "True",
        "FFlagModelPluginsEnabled": "True",
        "FFlagEnableAnimationExport": "True",
        "FFlagPromoteAssemblyModifications": "False",
        "FFlagUserHttpAPIEnabled": "True",
        "FFlagUserHttpStudioEnabled": "True",
        "FFlagCreateHumanoidRootNode": "True",
        "FFlagUseCharacterRootForCameraTarget": "True",
        "FFlagShowStreamingEnabledProp": "False",
        "FFlagSend": "True",
        "FFlagTerrainInfinite": "False",
        "FFlagInfiniteTerrain": "False",
        "FFlagRenderSafeChatOnlyForGuests": "True",
        "FFlagLuaEnableBytecode": "False",
        "FFlagDataStoreEnabled": "False",
        "FFlagEnableNPCServerAnimation": "True",
        "FFlagDisableGetKeyframeSequence": "False",
        "FFlagPhysics60HZ": "True",
        "FFlagResponsiveJump": "True",
        "FFlagTrimExtraSlashesAfterRobloxDomain": "True",
        "FFlagRenderSoftParticles": "True",
        "FFlagRenderLightGridEnabled": "True",
        "FFlagRenderLightGridShadowsSmooth": "True"
    },
    ['/grid/error.ashx']: 'OK',
    ['/asset']: async(req, res) => {
        var AssetId = req.query.id;
        var Fallback = () => {
            // TODO: Check if the asset id (on Roblox) exists before attempting to send (by fetching it)
            // ALSO TODO: Check if we have an internet connection
            //          If not, give the user SOMETHING.
            res.redirect(`https://assetdelivery.roblox.com/v1/asset?id=${AssetId}`)
        }
        if (Object.keys(StandardAssets).includes(AssetId)) {
            res.sendFile(`${__dirname}/asset/${StandardAssets[AssetId].Filename}`);
        } else {
            Fallback();
        }
    }
}

var App = Express();
Object.keys(Routes).forEach((RouteName) => {
    if (Routes[RouteName] instanceof Function) {
        App.all(RouteName, async(req, res) => {
            Routes[RouteName](req, res);
            console.log(req.url);
        })
    } else {
        App.all(RouteName, async(req, res) => {
            console.log(req.url);
            res.send(Routes[RouteName]);
        });
    }
})
App.all('*', (req, res) => {
    console.log(req.url, req.method)
    res.send('404');
})
App.listen(80, () => {
    console.log('Server is ready.')
})
FileSystem.readdir('./asset', async(_, Files) => {
    Files.forEach((File) => {
        var AssetId = File.split('.')[0];
        StandardAssets[AssetId] = {
            Filename: File
        }
    });
    console.log('Standard asset delivery is ready.');
})